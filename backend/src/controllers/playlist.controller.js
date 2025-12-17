import PlaylistModel from '../models/playlist.model.js';
import songModel from '../models/song.model.js';

export async function createPlaylist(req, res) {
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
        const playlist = await PlaylistModel.create({
            title,
            description,
            user: userId,
            songs: []
        });

        res.status(201).json({
            message: "Playlist created successfully",
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating playlist", error });
    }
}

export async function getMyPlaylists(req, res) {
    const userId = req.user.id;

    try {
        const playlists = await PlaylistModel.find({ user: userId })
            .populate('songs');

        res.status(200).json({
            message: "Playlists fetched successfully",
            playlists
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching playlists", error });
    }
}

export async function addSongToPlaylist(req, res) {
    const { playlistId, songId } = req.body;

    try {
        const playlist = await PlaylistModel.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: "Song already in playlist" });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({ message: "Song added to playlist", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error adding song", error });
    }
}

export async function removeSongFromPlaylist(req, res) {
    const { playlistId, songId } = req.body;

    try {
        const playlist = await PlaylistModel.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
        await playlist.save();

        res.status(200).json({ message: "Song removed from playlist", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error removing song", error });
    }
}

export async function getPlaylistById(req, res) {
    const { playlistId } = req.params;

    try {
        const playlist = await PlaylistModel.findById(playlistId)
            .populate('songs'); 

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({
            message: "Playlist fetched successfully",
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching playlist", error });
    }
}

export async function deletePlaylist(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const playlist = await PlaylistModel.findOne({ _id: id, user: userId });

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or unauthorized" });
        }

        await PlaylistModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Playlist deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting playlist", error });
    }
}

// --- NEW FUNCTION: Update Playlist ---
export async function updatePlaylist(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.user.id;

        // Ensure user owns the playlist
        const playlist = await PlaylistModel.findOne({ _id: id, user: userId });

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or unauthorized" });
        }

        // Update fields if provided
        playlist.title = title || playlist.title;
        playlist.description = description || playlist.description;
        
        await playlist.save();

        res.status(200).json({ message: "Playlist updated", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error updating playlist", error });
    }
}