import express from 'express';
import { uploadSong, getAllSongs, toggleLike, getLikedSongs, searchSongs, deleteSong, getSongsByArtist,getAllArtists  } from '../controllers/song.controller.js';
import { upload } from '../services/storage.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use((req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
});

router.post('/upload', upload.fields([{name:'chacha', maxCount:1}]), uploadSong);
router.get('/get-songs', getAllSongs);
router.post('/like', toggleLike);
router.get('/liked-songs', getLikedSongs);
router.get('/search-songs', searchSongs);
router.get('/get-artists', getAllArtists);
router.delete('/:id', deleteSong);

// NEW ROUTE
router.get('/artist/:name', getSongsByArtist);

export default router;