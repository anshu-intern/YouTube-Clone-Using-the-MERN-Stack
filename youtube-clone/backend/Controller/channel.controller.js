import fs from 'fs';
import path from "path";
import channelModel from "../Model/channel.model.js";
import userModel from "../Model/user.model.js";
import videoModel from "../Model/video.model.js";

export async function addChannel(req, res){
    try{
        const { channelName, channelHandle } = req.body;
        const { channelImage } = req.files;
        const image = channelImage && channelImage.length > 0 ? channelImage[0].path : null;

        const newChannel = new channelModel({
            channelName: channelName ,
            channelHandle: channelHandle,
            owner_id: req.user_id,
            channelImage: image
        });

        await newChannel.save();
        await userModel.findByIdAndUpdate(req.user_id, { $push: { channels: newChannel._id } });
        
        return res.status(201).json({success : true , message : "Channel created successfully.", channelId: newChannel._id});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

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
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

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

        const unlinkPromises = [];

        for (const video of videos) {
            if (video.videoUrl) { 
                const p = fs.promises.unlink(path.resolve(video.videoUrl)).catch( err =>  {console.error(`Failed to delete video file: ${video.videoUrl}`, err)} );
                unlinkPromises.push(p);
            }

            if (video.thumbnailUrl) {
                const p = fs.promises.unlink(path.resolve(video.thumbnailUrl)).catch( err =>  {console.error(`Failed to delete thumbnail file: ${video.thumbnailUrl}`, err)} );
                unlinkPromises.push(p);
            }
        }

        if (channel.channelBanner) {
            const p = fs.promises.unlink(path.resolve(channel.channelBanner)).catch(err =>  {console.error(`Failed to delete banner file: ${channel.channelBanner}`, err)});
            unlinkPromises.push(p);
        }

        if (channel.channelImage) {
            const p = fs.promises.unlink(path.resolve(channel.channelImage)).catch(err =>  {console.error(`Failed to delete channel image file: ${channel.channelImage}`, err)});
            unlinkPromises.push(p);
        }

        await Promise.all(unlinkPromises);

        await userModel.findByIdAndUpdate(req.user_id, { $pull: { channels: channel_id } });
        await videoModel.deleteMany({ channelId: channel_id });
        await channelModel.findByIdAndDelete(channel_id);

        return res.status(200).json({ success: true,  message: "Channel deleted successfully." });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

export async function modifyChannelDetailsById(req, res){
    try{
        const { channel_id } = req.params;
        const { description } = req.body;
        const banner = req.files?.['channelBanner']?.[0];
        const image = req.files?.['channelImage']?.[0];

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
                    await fs.promises.unlink(path.resolve(channel.channelBanner));
                } catch(err){
                    console.error(err);
                }
            }
            channel.channelBanner = banner.path;
        }

        if (image){
            if (channel.channelImage){
                try{
                    await fs.promises.unlink(path.resolve(channel.channelImage));
                } catch(err){
                    console.error(err);
                }
            }
            channel.channelImage = image.path;
        }

        await channel.save();

        return res.status(200).json({ success: true,  message: "Channel details updated successfully." });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

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
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

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
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}