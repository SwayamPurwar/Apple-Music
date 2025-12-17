import express from 'express';
import authRoutes from "./routes/auth.routes.js"
import songRoutes from "./routes/song.routes.js"
import playlistRoutes from "./routes/playlist.routes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path'; // Add this if needed
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

/* POST /auth/register */
/* POST /auth/login */
app.use('/auth',authRoutes)



/* POST /songs/upload */
/* GET /songs/get-songs */
/* GET /songs/get-song/:mama */
/* GET /songs/search-songs */
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);



export default app;