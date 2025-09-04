import mongoose from 'mongoose';

// Define channel schema.
const channelSchema = new mongoose.Schema({
    channelName      : { type: String, required: true, unique: true },
    channelHandle    : { type: String, required: true, unique: true },
    owner_id         : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description      : { type: String, default: null },
    channelImage     : { type: String, default: null },
    channelImage_id  : { type: String, default: null },
    channelBanner    : { type: String, default: null },
    channelBanner_id : { type: String, default: null },
    subscribers      : { type: Number, default: 0 },
    videos           : { type: [ {type: mongoose.Schema.Types.ObjectId, ref: "Video"} ], default: [] }
}, { timestamps : true });

// Define channel model.
const channelModel = mongoose.model("Channel", channelSchema);

export default channelModel;