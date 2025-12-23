import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { playFromContext } from '../redux/features/songSlice';
import './PlaylistDetails.css'; // Reuse playlist styles

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:3000/albums/${id}`, { withCredentials: true })
            .then(res => setAlbum(res.data.album))
            .catch(err => console.error(err));
    }, [id]);

    const handlePlay = (song) => {
        if (!album || !album.songs) return;
        dispatch(playFromContext({ song, list: album.songs }));
    };

    if (!album) return <div style={{padding:'20px', color:'white'}}>Loading...</div>;

    return (
        <section className="playlist-details-section">
            <div className="playlist-hero">
                <div className="playlist-cover-shadow">
                    <img src={album.bgImage} alt={album.title} />
                </div>
                <div className="playlist-meta">
                    <span className="playlist-type">Album</span>
                    <h1 className="playlist-title-lg">{album.title}</h1>
                    <p className="playlist-desc">{album.artist} • {new Date(album.createdAt).getFullYear()}</p>
                </div>
            </div>

            <div className="playlist-actions">
                <button className="play-big-btn" onClick={() => album.songs.length > 0 && handlePlay(album.songs[0])}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>

            <div className="songs-table">
                <div className="songs-table-body">
                    {album.songs && album.songs.map((song, index) => (
                        <div key={song._id} className="songs-table-row" onClick={() => handlePlay(song)}>
                            <div className="td-index">
                                <span className="index-num">{index + 1}</span>
                                <span className="play-icon">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </span>
                            </div>
                            <div className="td-title">
                                <span>{song.title}</span>
                            </div>
                            <div className="td-duration">3:45</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlbumDetails;