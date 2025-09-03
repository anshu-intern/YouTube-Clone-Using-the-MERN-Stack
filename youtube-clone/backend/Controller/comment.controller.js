import videoModel from "../Model/video.model.js";

export async function addComment(req, res){
    try{
        const { videoId, text } = req.body;
        const newComment = {
            userId: req.user_id,
            text: text
        }
       
        const video = await videoModel.findById(videoId);

        if (!video) {
            return res.status(404).json({ message: "Video not found to add a comment." });
        }

        video.comments.push(newComment);

        await video.save();

        return res.status(201).json({ message: "Comment added successfully.", data: video.comments });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error.", err: err});
    }
} 

export async function modifyComment(req, res){
    try{
        const { video_id, comment_id } = req.params;
        const { text } = req.body;

        const video = await videoModel.findById(video_id);

        if (!video) {
            return res.status(404).json({ message: "Video not found for the comment" });
        }

        const comment = video.comments.find( c => c._id.toString() === comment_id );

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        if( String(comment.userId) !== req.user_id){
            return res.status(403).json({ success: false, message: "Current user not authorised to modify this comment." });
        }

        comment.text = text;

        await video.save();
        return res.status(200).json({ success: true, message: "Comment updated successfully", data: video.comments });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function deleteComment(req, res){
    try{
        const { video_id , comment_id } = req.params; 

        const video = await videoModel.findById(video_id );

        if (!video) {
            return res.status(404).json({ message: "Video not found for the comment" });
        }

        const comment = video.comments.find( c => c._id.toString() === comment_id );

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
    
        if( String(comment.userId) !== req.user_id){
            return res.status(403).json({ success: false, message: "Current user not authorised to delete this comment." });
        }

        const updatedVideo = await videoModel.findByIdAndUpdate(
            video_id ,
            { $pull : { comments:{ _id : comment_id} } },
            { new: true }
        );

        if (!updatedVideo) {
            return res.status(404).json({ message: "Video or comment not found" });
        }

        return res.status(200).json({ message: "Comment deleted successfully", data: updatedVideo.comments  });

    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
}