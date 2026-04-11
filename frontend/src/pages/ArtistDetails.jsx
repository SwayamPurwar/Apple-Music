import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { playFromContext } from '../redux/features/songSlice';
import './PlaylistDetails.css'; // We reuse the playlist styles

const ArtistDetails = () => {
    const { name } = useParams();
    const [songs, setSongs] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const artistName = decodeURIComponent(name);
        
        axios.get(`${import.meta.env.VITE_API_URL}/songs/artist/${artistName}`, {
            withCredentials: true
        })
        .then(res => setSongs(res.data.songs))
        .catch(err => console.error(err));
    }, [name]);

    const handlePlayArtist = (song) => {
        dispatch(playFromContext({ song, list: songs }));
    };

    return (
        <section className="playlist-details-section">
            <div className="playlist-hero" style={{ alignItems: 'center' }}>
                <div className="playlist-cover-shadow" style={{ 
                    width: '232px', height: '232px', borderRadius: '50%', overflow: 'hidden',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.6)'
                }}>
                    {/* Use the first song's poster as the artist image */}
                    <img 
                        src={songs.length > 0 ? songs[0].poster : 'https://via.placeholder.com/200'} 
                        alt={name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>
                <div className="playlist-meta">
                    <span className="playlist-type" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{color: '#3d91f4'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                        Verified Artist
                    </span>
                    <h1 className="playlist-title-lg">{decodeURIComponent(name)}</h1>
                    <p className="playlist-desc">{songs.length} Tracks Available</p>
                </div>
            </div>

            <div className="playlist-actions">
                <button className="play-big-btn" onClick={() => songs.length > 0 && handlePlayArtist(songs[0])}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>

            <div className="songs-table">
                <h2 style={{color: 'white', marginBottom: '20px', fontSize: '24px'}}>Popular</h2>
                <div className="songs-table-body">
                    {songs.map((song, index) => (
                        <div key={song._id} className="songs-table-row" onClick={() => handlePlayArtist(song)}>
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
                            <div className="td-artist" style={{color: 'white'}}>{song.artist}</div>
                            <div className="td-duration">3:45</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArtistDetails;