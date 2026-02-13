import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    profilePicture: {
        type: String,
        deafault: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User