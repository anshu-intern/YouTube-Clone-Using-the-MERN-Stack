import mongoose from 'mongoose';

// Defind user schema
const userSchema = new mongoose.Schema({
    username : { type : String, required : true, unique: true },
    email    : { type : String, required : true, unique: true },
    password : { type : String, required : true },
    avatar   : { type : String, default : null },
    channels : { type : [ {type: mongoose.Schema.Types.ObjectId, ref: "Channel"} ], default : [] }
},{timestamps: true});

// Define user model
const userModel = mongoose.model("User", userSchema);

export default userModel;