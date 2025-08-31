import channelModel from "../Model/channel.model.js";
import userModel from "../Model/user.model.js";

export async function addChannel(req, res){
    try{
        const { channelName, channelHandle } = req.body;
        const channelImage = req.file ? "image" : null;

        const newChannel = new channelModel({
            channelName: channelName ,
            channelHandle: channelHandle,
            owner_id: req.user_id,
            channelImage: channelImage 
        });

        await newChannel.save();
        await userModel.findByIdAndUpdate(req.user_id, { $push: { channels: newChannel._id } });
        
        return res.status(201).json({success : true , message : "Channel created successfully.", channelId: newChannel._id});
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}

export async function getChannelById(req, res){
    try{
        const { channel_id } = req.params;

        const channel = await channelModel.findById(channel_id).populate({
            path : 'videos',
            select : '_id title thumbnailUrl views uploadDate'
        });

        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }

        return res.status(200).json({ success: true, data: channel});

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error." , err: err});
    }
}