import express from 'express';
import { 
    createPlaylist, 
    getMyPlaylists, 
    addSongToPlaylist, 
    removeSongFromPlaylist, 
    getPlaylistById, 
    deletePlaylist, 
    updatePlaylist 
} from '../controllers/playlist.controller.js';
import { isAuth } from '../middlewares/isAuth.js'; // <--- Using the central middleware

const router = express.Router();

// 1. Apply middleware to ALL routes here
router.use(isAuth);

// 2. Define Routes
router.post('/create', createPlaylist);
router.get('/my-playlists', getMyPlaylists); // <--- This is the one fetching the empty list
router.post('/add-song', addSongToPlaylist);
router.post('/remove-song', removeSongFromPlaylist);

// 3. Dynamic routes last
router.delete('/:id', deletePlaylist);
router.put('/:id', updatePlaylist);
router.get('/:playlistId', getPlaylistById); 

export default router;