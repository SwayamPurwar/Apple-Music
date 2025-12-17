import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// 1. Import playFromContext
import { selectSongs, setSongs, playFromContext } from '../redux/features/songSlice'
import axios from 'axios'
import './Albums.css'

const Albums = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);

    useEffect(() => {
        axios.get("http://localhost:3000/songs/get-songs", {
            withCredentials: true
        })
        .then(response => {
            dispatch(setSongs(response.data.songs))
        })
    }, [dispatch]);

    // 2. Update Play Function
    const handlePlaySong = (song) => {
        dispatch(playFromContext({ song, list: songs }));
    };

    return (
        <section className="albums-section">
            <div className="albums-header">
                <h1>Albums</h1>
                <p>Your Collection</p>
            </div>

            <div className="albums-grid">
                {songs.map(song => (
                    <div key={song._id} className="album-card" onClick={() => handlePlaySong(song)}>
                        <div className="album-image-container">
                            <img src={song.poster} alt={song.title} loading="lazy" />
                            <div className="album-play-overlay">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                        <div className="album-info">
                            <div className="album-title">{song.title}</div>
                            <div className="album-artist">{song.artist}</div>
                            <div className="album-year">2024 • Single</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Albums