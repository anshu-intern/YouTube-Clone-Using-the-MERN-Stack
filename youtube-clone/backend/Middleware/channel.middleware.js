// Validate post channel inputs.
export function validateChannelPostInput(req, res, next){

    const channelName = req.body.channelName?.trim();
    const channelHandle = req.body.channelHandle?.trim();

    if (!channelName) {
        return res.status(400).json({ success : false , message : "Channel name is required." });
    }

    if (!channelHandle) {
        return res.status(400).json({ success : false , message : "Channel handle is required." });
    }

    req.body.channelName = channelName;
    req.body.channelHandle = channelHandle;

    next();
}

// Validate update channel inputs
export function validateChannelUpdateInput(req, res, next){

    const description = req.body.description?.trim();

    if (description !== undefined){
        if ( description.length === 0) {
            return res.status(400).json({ success : false , message : "Description cannot be empty if provided." });
        } 
        else{
            req.body.description = description;
        }
    }  

    next();
}