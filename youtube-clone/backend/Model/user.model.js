import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Defind user schema
const userSchema = new mongoose.Schema({
    userId   : { type : String, required : true, unique: true },
    username : { type : String, required : true, unique: true },
    email    : { type : String, required : true, unique: true },
    password : { type : String, required : true },
    avatar   : { type : String, default : null },
    channels : { type : [ String ], default : [] }
},{timestamps: true});

// Pre-save hook to hash password before saving to DB
userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(err) {
        next(err);
    }
})

// Method to compare entered password with hashed password in DB
userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password, this.password);

};

// Define user model
const userModel = mongoose.model("user", userSchema);

export default userModel;