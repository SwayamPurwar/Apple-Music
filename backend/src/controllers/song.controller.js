import songModel from '../models/song.model.js';
import User from '../models/user.model.js';
import PlaylistModel from '../models/playlist.model.js';
import { uploadFile } from '../services/storage.service.js';

export async function uploadSong(req, res) {
    try {
        const { title, artist } = req.body;
        
        let audioUrl = "";
        if (req.files && req.files.chacha && req.files.chacha[0]) {
             const file = req.files.chacha[0];
             // Pass the file buffer and original name instead of a local path
             const audioResult = await uploadFile(file.buffer, file.originalname, 'songs');
             audioUrl = audioResult.url;
        }

        const posterUrl = `https://picsum.photos/seed/${title}/200/200`;

        const newSong = await songModel.create({
            title,
            artist,
            audio: audioUrl,
            poster: posterUrl
        });

        res.status(201).json({ message: "Song uploaded", song: newSong });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error uploading song" });
    }
}

export async function getAllSongs(req, res) {
   try {
        const songs = await songModel.find();
        res.status(200).json({ songs });
   } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching songs" });
   }
}

export async function toggleLike(req, res) {
    try {
        const { songId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        const song = await songModel.findById(songId);

        if (!song) return res.status(404).json({ message: "Song not found" });

        const isLiked = user.likedSongs.includes(songId);

        if (isLiked) {
            user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId);
            await user.save();
            return res.status(200).json({ message: "Unliked", isLiked: false });
        } else {
            user.likedSongs.push(songId);
            await user.save();
            return res.status(200).json({ message: "Liked", isLiked: true });
        }

    } catch (error) {
        res.status(500).json({ message: "Error toggling like", error });
    }
}

export async function getLikedSongs(req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('likedSongs'); 

        res.status(200).json({ likedSongs: user.likedSongs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching liked songs", error });
    }
}

export async function searchSongs(req, res) {
    try {
        const { text } = req.query;
        if (!text) return res.status(400).json({ message: "Search text required" });

        const songs = await songModel.find({
            $or: [
                { title: { $regex: text, $options: 'i' } },
                { artist: { $regex: text, $options: 'i' } }
            ]
        });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "Error searching songs", error });
    }
}

export async function deleteSong(req, res) {
    try {
        const { id } = req.params;
        const song = await songModel.findById(id);
        
        if (!song) return res.status(404).json({ message: "Song not found" });

        await songModel.findByIdAndDelete(id);

        await User.updateMany(
            {}, 
            { $pull: { likedSongs: id } }
        );

        await PlaylistModel.updateMany(
            {},
            { $pull: { songs: id } }
        );

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting song", error });
    }
}

export async function getSongsByArtist(req, res) {
    try {
        const { name } = req.params;
        const songs = await songModel.find({ 
            artist: { $regex: new RegExp(`^${name}$`, 'i') } 
        });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching artist songs", error });
    }
}

export async function getAllArtists(req, res) {
    try {
        const artists = await songModel.aggregate([
            {
                $group: {
                    _id: "$artist",
                    poster: { $first: "$poster" },
                    songCount: { $sum: 1 }         
                }
            },
            { $sort: { _id: 1 } } 
        ]);

        res.status(200).json({ artists });
    } catch (error) {
        res.status(500).json({ message: "Error fetching artists", error });
    }
}