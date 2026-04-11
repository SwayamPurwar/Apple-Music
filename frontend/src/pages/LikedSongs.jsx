import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { playFromContext } from '../redux/features/songSlice'; // Updated import
import './PlaylistDetails.css';

const LikedSongs = () => {
    const [likedSongs, setLikedSongs] = useState([]);
    const dispatch = useDispatch();

    const fetchLikedSongs = () => {
       axios.get(`${import.meta.env.VITE_API_URL}/songs/liked-songs`, {
            withCredentials: true
        })
        .then(res => setLikedSongs(res.data.likedSongs))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchLikedSongs();
    }, []);

    const handleUnlike = (e, songId) => {
        e.stopPropagation();
      axios.post(`${import.meta.env.VITE_API_URL}/songs/like`, { songId }, {
            withCredentials: true
        }).then(() => {
            fetchLikedSongs();
        });
    };

    const handlePlaySong = (song) => {
        // Set queue to Liked Songs list
        dispatch(playFromContext({ song, list: likedSongs }));
    };

    return (
        <section className="playlist-details-section">
            <div className="playlist-hero" style={{ background: 'linear-gradient(transparent, rgba(80, 56, 160, 0.3))', padding: '20px', borderRadius: '12px' }}>
                <div className="playlist-cover-shadow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '232px', height: '232px', background: 'linear-gradient(135deg, #450af5, #c4efd9)', borderRadius: '12px' }}>
                    <svg viewBox="0 0 24 24" fill="white" width="80" height="80"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <div className="playlist-meta">
                    <span className="playlist-type">Playlist</span>
                    <h1 className="playlist-title-lg">Liked Songs</h1>
                    <div className="playlist-stats">
                        <span className="owner-name">You</span> • {likedSongs.length} songs
                    </div>
                </div>
            </div>

            <div className="songs-table">
                <div className="songs-table-header">
                    <div className="th-index">#</div>
                    <div className="th-title">Title</div>
                    <div className="th-artist">Artist</div>
                    <div className="th-duration">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                </div>

                <div className="songs-table-body">
                    {likedSongs.length > 0 ? (
                        likedSongs.map((song, index) => (
                            <div key={song._id} className="songs-table-row" onClick={() => handlePlaySong(song)}>
                                <div className="td-index">
                                    <span className="index-num">{index + 1}</span>
                                    <span className="play-icon">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </span>
                                </div>
                                <div className="td-title">
                                    <img src={song.poster} alt="" className="table-poster" />
                                    <span>{song.title}</span>
                                </div>
                                <div className="td-artist">{song.artist}</div>
                                <div className="td-duration" style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <button 
                                        onClick={(e) => handleUnlike(e, song._id)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ed760' }}
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                    </button>
                                    <span>3:45</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-playlist">
                            <p>No liked songs yet.</p>
                            <span>Hit the heart icon on any song to save it here!</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LikedSongs;