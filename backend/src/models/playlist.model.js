import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "My awesome playlist"
    },
    poster: {
        type: String,
        default: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2940&auto=format&fit=crop"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "song"
    }]
}, { timestamps: true });

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

export default PlaylistModel;