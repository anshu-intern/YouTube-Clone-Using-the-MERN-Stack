import fs from 'fs';
import path from "path";
import channelModel from '../Model/channel.model.js';
import videoModel from '../Model/video.model.js';
import userModel from '../Model/user.model.js';

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
        const video = await videoModel.findById( req.params.video_id).populate({
            path : 'channelId',
            select : '_id channelName subscribers'
        });
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }
        video.views += 1 ;
        await video.save();
        res.status(200).json({success : true , data : video });
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function addVideo(req, res){
    try{
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

export async function deleteVideoById(req, res){
    try{
        const { video_id } = req.params;

        const video = await videoModel.findById(video_id);

        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        if (video.uploader.toString() !== req.user_id) {
            return res.status(403).json({ success: false, message: "Current user not authorized to delete this video." });
        }

        if (video.videoUrl){
            try{
                await fs.promises.unlink(path.resolve(video.videoUrl));
            } catch(err){
                console.error(err);
            }
        }

        if (video.thumbnailUrl){
            try{
                await fs.promises.unlink(path.resolve(video.thumbnailUrl));
            } catch(err){
                console.error(err);
            }
        }

        await channelModel.findByIdAndUpdate(video.channelId, { $pull: { videos: video_id } });
        await videoModel.findByIdAndDelete(video_id);
        return res.status(200).json({ success: true,  message: "Video deleted successfully." });

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."}); 
    }
}

export async function updateVideoById(req, res){
    try{
        const { video_id } = req.params;
        const { title, description, category } = req.body;
        const thumbnailFile = req.files?.['thumbnail']?.[0];

        if(!title && !description && !category && !thumbnailFile){
            return res.status(400).json({success: false , message: "No input provided for update."});
        }

        const video = await videoModel.findById(video_id);

        if (!video){
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        if (video.uploader.toString() !== req.user_id) {
            return res.status(403).json({ success: false, message: "Current user not authorized to modify this video." });
        }

        if (title){
            video.title = title;
        }

        if (description){
            video.description = description;
        }

        if (category){
            video.category = category;
        }

        if (thumbnailFile){
            if (video.thumbnailUrl){
                try{
                    await fs.promises.unlink(path.resolve(video.thumbnailUrl));
                } catch(err){
                    console.error(err);
                }
            }
            video.thumbnailUrl = thumbnailFile.path;
        }

        await video.save();

        return res.status(200).json({ success: true,  message: "Video details updated successfully." });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function toggleAddVideoLike(req, res){
    try{
        const { video_id } = req.params;

        const video = await videoModel.findById(video_id);

        if (!video){
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        const user = await userModel.findById(req.user_id);

        if (!user){
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const alreadyLiked = user.likedVideos.includes(video_id);
        const alreadyDisLiked = user.dislikedVideos.includes(video_id);

        if (alreadyLiked){
            user.likedVideos.pull(video_id);
            video.likes = Math.max(video.likes - 1 , 0);
            await user.save();
            await video.save();
            return res.status(200).json({ success: true, message: "Video like removed." });
        }

        if (alreadyDisLiked){
            user.dislikedVideos.pull(video_id);
            video.dislikes = Math.max(video.dislikes - 1 , 0);
        }

        user.likedVideos.push(video_id);
        video.likes = video.likes + 1;

        await user.save();
        await video.save();

        return res.status(200).json({ success: true,  message: "Video liked successfully." });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function toggleAddVideoDisLike(req, res){
    try{
        const { video_id } = req.params;

        const video = await videoModel.findById(video_id);

        if (!video){
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        const user = await userModel.findById(req.user_id);

        if (!user){
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const alreadyLiked = user.likedVideos.includes(video_id);
        const alreadyDisLiked = user.dislikedVideos.includes(video_id);

        if (alreadyDisLiked){
            user.dislikedVideos.pull(video_id);
            video.dislikes = Math.max(video.dislikes -1 , 0);
            await user.save();
            await video.save();
            return res.status(200).json({ success: true, message: "Video dislike removed." });
        }

        if (alreadyLiked){
            user.likedVideos.pull(video_id);
            video.likes = Math.max(video.likes - 1 , 0);
        }

        user.dislikedVideos.push(video_id);
        video.dislikes = video.dislikes + 1;

        await user.save();
        await video.save();

        return res.status(200).json({ success: true,  message: "Video disliked successfully." });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
}