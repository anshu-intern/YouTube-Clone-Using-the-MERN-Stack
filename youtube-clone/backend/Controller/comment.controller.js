import videoModel from "../Model/video.model.js";

export async function addComment(req, res){
    try{
        const { videoId, userId, text } = req.body;
        const newComment = {
            commentId: 9993,
            userId,
            text
        }
        const video = await videoModel.findOne({ videoId : videoId });
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        video.comments.push(newComment);

        await video.save();

        res.status(201).json({ message: "Comment added successfully", data: video.comments });
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
} 

export async function modifyComment(req, res){
    try{
        const { video_id, comment_id } = req.params;
        const { text } = req.body;
        const video = await videoModel.findOne({ videoId : video_id });
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        const comment = video.comments.find( c => c.commentId === comment_id );
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        comment.text = text;
        await video.save();
        return res.status(200).json({ success: true, message: "Comment updated successfully", data: video.comments });

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function deleteComment(req, res){
    try{
        const { video_id , comment_id } = req.params; 

        const updatedVideo = await videoModel.findOneAndUpdate(
            { videoId : video_id },
            { $pull : { comments:{ commentId : comment_id} } },
            { new: true }
        );
        if (!updatedVideo) {
            return res.status(404).json({ message: "Video or comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully", data: updatedVideo.comments  });

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}