// Validate add video input
export function validateAddVideoInput(req, res, next){
    
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const category = req.body.category?.trim();
    const channelId = req.body.channelId?.trim();

    if (!title) {
        return res.status(400).json({ success : false , message : "Title is required." });
    }

    if (!description) {
        return res.status(400).json({ success : false , message : "Description is required." });
    }

    if (!category) {
        return res.status(400).json({ success : false , message : "Category is required." });
    }

    if (!channelId) {
        return res.status(400).json({ success : false , message : "Channel ID is required." });
    }
    req.body.title = title;
    req.body.description = description;
    req.body.category = category;
    req.body.channelId = channelId;
    next();
}

// Validate update video input
export function validateUpdateVideoInput(req, res, next){

    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;

    if (title !== undefined) {
        const trimmedTitle = title.trim();
        if (trimmedTitle.length === 0) {
            return res.status(400).json({ success : false , message : "Title cannot be empty if provided." });
        }
        req.body.title = trimmedTitle;
    }

    if (description !== undefined) {
        const trimmedDescription = description.trim();
        if (trimmedDescription.length === 0) {
            return res.status(400).json({ success : false , message : "Description cannot be empty if provided." });
        }
        req.body.description = trimmedDescription;
    }

    if (category !== undefined) {
        const trimmedCategory = category.trim();
        if (trimmedCategory.length === 0) {
            return res.status(400).json({ success : false , message : "Category cannot be empty if provided." });
        }
        req.body.category = trimmedCategory;
    }

    next();
}