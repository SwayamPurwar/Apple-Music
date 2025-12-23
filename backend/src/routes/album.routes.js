import express from 'express';
import { createAlbum, getAllAlbums, getAlbumById } from '../controllers/album.controller.js';
import { upload } from '../services/storage.service.js';
import { isAuth } from '../middlewares/isAuth.js'; // Assuming you have this middleware

const router = express.Router();

router.post('/create', isAuth, upload.single('image'), createAlbum);
router.get('/all', getAllAlbums);
router.get('/:id', getAlbumById);

export default router;