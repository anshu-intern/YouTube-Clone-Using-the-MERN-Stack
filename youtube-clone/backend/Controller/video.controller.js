import channelModel from '../Model/channel.model.js';
import videoModel from '../Model/video.model.js';

export async function getVideo(req, res){
    try{
        const videos = await videoModel.find();
        if (!videos) {
            return res.status(404).json({ success: false, message: "No data found." });
        }
        res.status(200).json({success : true , data : videos });

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function getVideoById(req, res){
    try{
        const video = await videoModel.findOne({ _id : req.params.video_id});
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }
        res.status(200).json({success : true , data : video });
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function addVideo(req, res){
    try{
        console.log(req.body);
        const { title, description, category, channelId} = req.body;
        const videoUrl = req.files['video']?.[0]
        const thumbUrl = req.files['thumbnail']?.[0]

        const newVideo = new videoModel({
            title: title,
            thumbnailUrl: thumbUrl.path,
            videoUrl: videoUrl.path,
            description: description,
            category: category,
            channelId: channelId,
            uploader: req.user_id,
            uploadDate: new Date()
        });

        await newVideo.save();
        await channelModel.findByIdAndUpdate(channelId,{ $push: { videos: newVideo._id }});
        return res.status(201).json({success : true , message : "Video added successfully.", videoId: newVideo._id});

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});  
    }
}