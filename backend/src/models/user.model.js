import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // New Field: Liked Songs
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "song"
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;