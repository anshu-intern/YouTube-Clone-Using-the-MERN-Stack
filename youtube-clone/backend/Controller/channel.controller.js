import channelModel from "../Model/channel.model.js";
import userModel from "../Model/user.model.js";
import videoModel from "../Model/video.model.js";
import { uploadCloud, deleteFromCloudinary } from '../Middleware/storage.cloudinary.js';

// Add chennel for user.
export async function addChannel(req, res){
    try{
        const { channelName, channelHandle } = req.body;
        const channelImageFile = req.files?.['channelImage']?.[0];
        let result = null;

        const existingChannel = await channelModel.findOne({
            $or: [{ channelName: channelName },{ channelHandle: channelHandle }]
        });

        if (existingChannel) {
            return res.status(400).json({ success : false , message : existingChannel.channelName === channelName ? "Channel name already exists." : "Channel handle already exists."});
        }

        if (channelImageFile){
            const publicId = `${Date.now()}-${channelImageFile.originalname.split('.')[0]}`;
            result = await uploadCloud(channelImageFile.buffer, publicId, 'channel_images','image');
        }

        const newChannel = new channelModel({
            channelName: channelName ,
            channelHandle: channelHandle,
            owner_id: req.user_id,
            channelImage: result?.secure_url || null,
            channelImage_id : result?.public_id || null
        });

        await newChannel.save();
        await userModel.findByIdAndUpdate(req.user_id, { $push: { channels: newChannel._id } });
        
        return res.status(201).json({success : true , message : "Channel created successfully.", channelId: newChannel._id});
    } catch(err){
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

// Get channel details by id.
export async function getChannelById(req, res){
    try{
        const { channel_id } = req.params;

        const channel = await channelModel.findById(channel_id).populate({
            path : 'videos',
            select : '_id title description category thumbnailUrl views likes comments uploadDate'
        });

        if (!channel) {
            return res.status(404).json({ success: false, message: "Channel not found." });
        }

        return res.status(200).json({ success: true, data: channel});

    } catch(err){
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

// Delete channel by id.
export async function deleteChannel(req, res){
    try{
        const { channel_id } = req.params;

        const channel = await channelModel.findById(channel_id);

        if (!channel) {
            return res.status(404).json({ success: false, message: "Channel not found." });
        }

        if (channel.owner_id.toString() !== req.user_id) {
            return res.status(403).json({ success: false, message: "Current user not authorized to delete this channel." });
        }

        const videos = await videoModel.find({ channelId: channel_id });

        await Promise.all(
            videos.map(async (video) => {
                try {
                    if (video.videoUrl_id) {
                        await deleteFromCloudinary(video.videoUrl_id);
                    }

                    if (video.thumbnailUrl_id) {
                        await deleteFromCloudinary(video.thumbnailUrl_id);
                    }
                } catch (err) {
                    console.warn(`Failed to delete media for video ${video._id}:`, err.message);
                }
            })
        );

        try{
            if (channel.channelBanner){
                await deleteFromCloudinary(channel.channelBanner_id);
            }

            if (channel.channelImage){
                await deleteFromCloudinary(channel.channelImage_id)
            }
        } catch(err){
            console.warn(`Failed to delete channel images:`, err.message);
        }

        await userModel.findByIdAndUpdate(req.user_id, { $pull: { channels: channel_id } });
        await videoModel.deleteMany({ channelId: channel_id });
        await channelModel.findByIdAndDelete(channel_id);

        return res.status(200).json({ success: true,  message: "Channel deleted successfully." });

    } catch(err){
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

// Modify channel details by id.
export async function modifyChannelDetailsById(req, res){
    try{
        const { channel_id } = req.params;
        const { description } = req.body;
        const banner = req.files?.['channelBanner']?.[0];
        const image = req.files?.['channelImage']?.[0];
        let result = null;

        if ( !description && !banner && !image ){
            return res.status(400).json({success: false , message: "No input provided for update."});
        }

        const channel = await channelModel.findById(channel_id);

        if (!channel) {
            return res.status(404).json({ success: false, message: "Channel not found." });
        }

        if (channel.owner_id.toString() !== req.user_id) {
            return res.status(403).json({ success: false, message: "Current user not authorized to modify this channel." });
        }

        if (description){
            channel.description = description;
        }

        if (banner){
            if (channel.channelBanner){
                try{
                    await deleteFromCloudinary(channel.channelBanner_id);
                } catch(err){
                    console.warn(`Failed to delete banner for channel ${channel._id}:`, err.message);
                }
            }
            const publicId = `${Date.now()}-${banner.originalname.split('.')[0]}`;
            result = await uploadCloud(banner.buffer, publicId, 'channel_banners','image');
            channel.channelBanner = result?.secure_url || null;
            channel.channelBanner_id = result?.public_id || null;
        }

        if (image){
            if (channel.channelImage){
                try{
                    await deleteFromCloudinary(channel.channelImage_id);
                } catch(err){
                    console.warn(`Failed to delete image for channel ${channel._id}:`, err.message);
                }
            }
            const publicId = `${Date.now()}-${image.originalname.split('.')[0]}`;
            result = await uploadCloud(image.buffer, publicId, 'channel_images','image');
            channel.channelImage = result?.secure_url || null;
            channel.channelImage_id = result?.public_id || null;
        }

        await channel.save();

        return res.status(200).json({ success: true,  message: "Channel details updated successfully." });

    } catch(err){
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

// Subscribe user to channel.
export async function subscribeToChannel(req, res){
    try{
        const { channel_id } = req.params;

        const channel = await channelModel.findById(channel_id);

        if (!channel){
            return res.status(404).json({ success: false, message: "Channel not found." });
        }

        const user = await userModel.findById(req.user_id);

        if (!user){
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if ( String(user._id) === String(channel.owner_id) ){
            return res.status(409).json({ success: false, message: "User cannot subscribe to self channel." });
        }

        const existing = user.subscribedChannels.includes(channel_id);

        if (existing){
            return res.status(409).json({ success: false, message: "User already subscribed to channel." });
        }

        user.subscribedChannels.push(channel_id);
        channel.subscribers = channel.subscribers + 1;

        await user.save();
        await channel.save();

        return res.status(200).json({ success: true,  message: "User subscribed to channel successfully." });

    } catch(err){
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

// Unsubscribe user from channel.
export async function unsubscribeToChannel(req, res){
    try{
        const { channel_id } = req.params;

        const channel = await channelModel.findById(channel_id);

        if (!channel){
            return res.status(404).json({ success: false, message: "Channel not found." });
        }

        const user = await userModel.findById(req.user_id);

        if (!user){
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const existing = user.subscribedChannels.includes(channel_id);

        if (!existing){
            return res.status(409).json({ success: false, message: "User not subscribed to channel." });
        }

        user.subscribedChannels.pull(channel_id);
        channel.subscribers = Math.max(channel.subscribers - 1 , 0);

        await user.save();
        await channel.save();

        return res.status(200).json({ success: true,  message: "User un-subscribed from channel successfully." });

    } catch(err){
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}