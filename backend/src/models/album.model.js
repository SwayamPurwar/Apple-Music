import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    bgImage: {
        type: String,
        default: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop"
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song'
    }]
}, { timestamps: true });

const Album = mongoose.model("Album", albumSchema);

export default Album;