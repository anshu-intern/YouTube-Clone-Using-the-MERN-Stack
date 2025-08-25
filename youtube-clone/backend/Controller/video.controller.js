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
        const video = await videoModel.findOne({ videoId : req.params.video_id});
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }
        res.status(200).json({success : true , data : video });
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}