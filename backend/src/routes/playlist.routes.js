import express from 'express';
import { 
    createPlaylist, 
    getMyPlaylists, 
    addSongToPlaylist, 
    removeSongFromPlaylist, 
    getPlaylistById,
    deletePlaylist, // Import this
    updatePlaylist  // Import this
} from '../controllers/playlist.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/create', isAuth, createPlaylist);
router.get('/my-playlists', isAuth, getMyPlaylists);
router.post('/add-song', isAuth, addSongToPlaylist);
router.post('/remove-song', isAuth, removeSongFromPlaylist);
router.get('/:playlistId', isAuth, getPlaylistById);

// --- ADD THESE TWO ROUTES ---
router.put('/:id', isAuth, updatePlaylist);
router.delete('/:id', isAuth, deletePlaylist);

export default router;