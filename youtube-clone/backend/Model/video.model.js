import mongoose, { mongo, Schema } from "mongoose";

// Define comment schema
const commentSchema = new mongoose.Schema({
    commentId   : { type: String, required: true },
    userId      : { type: String, required: true },
    text        : { type: String, required: true }
}, { timestamps : true });

// Defind video schema
const videoSchema = new mongoose.Schema({
    videoId         : { type : String, required : true, unique : true },
    title           : { type : String, required : true },
    thumbnailUrl    : { type : String, required : true },
    videoUrl        : { type : String, required : true },
    description     : { type : String, required : true },
    category        : { type : String, default : null },
    channelId       : { type : String, required : true },
    uploader        : { type : String, required : true },
    views           : { type : Number, default : 0 },
    likes           : { type : Number, default : 0 },
    dislikes        : { type : Number, default : 0 },
    uploadDate      : { type : Date, required: true },
    comments        : [ commentSchema ]
}, { timestamps : true });

// Define video model
const videoModel = mongoose.model("video" , videoSchema);

export default videoModel;