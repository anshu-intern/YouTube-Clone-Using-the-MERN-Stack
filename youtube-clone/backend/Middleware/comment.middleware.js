// Validate input for post comment.
export function validatePostCommentInput(req, res, next){
    
    const videoId = req.body.videoId?.trim();
    const text = req.body.text?.trim();

    if ( !videoId ) {
        return res.status(400).json({ success : false , message: "Video ID is required."});
    }

    if ( !text ) {
        return res.status(400).json({ success : false , message : "Comment text cannot be empty."});
    }

    req.body.videoId = videoId;
    req.body.text = text;

    next();
}

// Validate modify comment
export function validateModifyCommentInput(req, res, next){

    const text = req.body.text?.trim();

    if ( !text ) {
        return res.status(400).json({ success : false , message : "Comment text cannot be empty."});
    }

    req.body.text = text;

    next();
}