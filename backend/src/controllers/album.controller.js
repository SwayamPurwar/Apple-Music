import Album from '../models/album.model.js';
import { uploadFile } from '../services/storage.service.js';

export async function createAlbum(req, res) {
    try {
        const { title, artist, description } = req.body;
        let bgImage = "";

        if (req.file) {
            const fileResult = await uploadFile(req.file.path);
            bgImage = fileResult.url;
        }

        const album = await Album.create({
            title,
            artist,
            description,
            bgImage: bgImage || undefined
        });

        res.status(201).json({ message: "Album created", album });
    } catch (error) {
        res.status(500).json({ message: "Error creating album", error });
    }
}

export async function getAllAlbums(req, res) {
    try {
        const albums = await Album.find();
        res.status(200).json({ albums });
    } catch (error) {
        res.status(500).json({ message: "Error fetching albums", error });
    }
}

export async function getAlbumById(req, res) {
    try {
        const { id } = req.params;
        // Populate the 'songs' array so we see the actual song details
        const album = await Album.findById(id).populate('songs');
        
        if (!album) return res.status(404).json({ message: "Album not found" });

        res.status(200).json({ album });
    } catch (error) {
        res.status(500).json({ message: "Error fetching album", error });
    }
}