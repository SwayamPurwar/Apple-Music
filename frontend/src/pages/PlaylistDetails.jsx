import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { playFromContext } from '../redux/features/songSlice';
import EditPlaylistModal from '../components/EditPlaylistModal'; // Import the modal
import MobileHeader from '../components/MobileHeader';
import './PlaylistDetails.css';

const PlaylistDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [playlist, setPlaylist] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // To check ownership

    // 1. Fetch Playlist & Current User
    useEffect(() => {
        // Fetch Playlist
        axios.get(`http://localhost:3000/playlists/${id}`, { withCredentials: true })
            .then(res => setPlaylist(res.data.playlist))
            .catch(() => navigate('/playlists'));

        // Fetch User (to show Edit/Delete buttons only if owner)
        axios.get("http://localhost:3000/auth/me", { withCredentials: true })
            .then(res => setCurrentUser(res.data.user))
            .catch(err => console.error(err));
    }, [id, navigate]);

    // 2. Play Song
    const handlePlay = (song) => {
        if (!playlist || !playlist.songs) return;
        dispatch(playFromContext({ song, list: playlist.songs }));
    };

    // 3. Handle Delete
    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete this playlist?")) return;

        axios.delete(`http://localhost:3000/playlists/${id}`, { withCredentials: true })
            .then(() => navigate('/playlists'))
            .catch(err => alert("Failed to delete playlist"));
    };

    // 4. Handle Remove Song from Playlist
    const handleRemoveSong = (e, songId) => {
        e.stopPropagation();
        axios.post("http://localhost:3000/playlists/remove-song", {
            playlistId: id,
            songId: songId
        }, { withCredentials: true })
        .then(res => setPlaylist(res.data.playlist))
        .catch(err => console.error(err));
    };

    if (!playlist) return <div style={{padding:'20px', color:'white'}}>Loading...</div>;

    const isOwner = currentUser && currentUser._id === playlist.user;

    return (
        <section className="playlist-details-section">
            <MobileHeader title="Playlist" />

            {/* Edit Modal */}
            {showEditModal && (
                <EditPlaylistModal 
                    playlist={playlist} 
                    onClose={() => setShowEditModal(false)}
                    onUpdate={(updated) => setPlaylist(updated)}
                />
            )}

            <div className="playlist-hero">
                <div className="playlist-cover-shadow">
                    <img 
                        src={playlist.poster || "https://placehold.co/400?text=Playlist"} 
                        alt={playlist.title} 
                    />
                </div>
                <div className="playlist-meta">
                    <span className="playlist-type">Playlist</span>
                    <h1 className="playlist-title-lg">{playlist.title}</h1>
                    <p className="playlist-desc">{playlist.description}</p>
                    <p className="playlist-stats">{playlist.songs.length} Songs</p>
                    
                    {/* Owner Actions */}
                    {isOwner && (
                        <div className="owner-actions" style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
                            <button 
                                onClick={() => setShowEditModal(true)}
                                style={{
                                    background: 'rgba(255,255,255,0.1)', 
                                    border: 'none', color: 'white', padding: '8px 16px', 
                                    borderRadius: '20px', cursor: 'pointer', fontSize: '14px'
                                }}
                            >
                                Edit
                            </button>
                            <button 
                                onClick={handleDelete}
                                style={{
                                    background: 'rgba(255,255,255,0.1)', 
                                    border: 'none', color: '#fa2d48', padding: '8px 16px', 
                                    borderRadius: '20px', cursor: 'pointer', fontSize: '14px'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="playlist-actions">
                <button className="play-big-btn" onClick={() => playlist.songs.length > 0 && handlePlay(playlist.songs[0])}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>

            <div className="songs-table">
                <div className="songs-table-body">
                    {playlist.songs && playlist.songs.map((song, index) => (
                        <div key={song._id} className="songs-table-row" onClick={() => handlePlay(song)}>
                            <div className="td-index">
                                <span className="index-num">{index + 1}</span>
                            </div>
                            <div className="td-title">
                                <img src={song.poster} alt="" className="table-poster" />
                                <span>{song.title}</span>
                            </div>
                            <div className="td-artist">{song.artist}</div>
                            
                            {/* Remove Button (Only for Owner) */}
                            {isOwner && (
                                <div className="td-actions">
                                    <button 
                                        className="btn-text-only" 
                                        onClick={(e) => handleRemoveSong(e, song._id)}
                                        title="Remove from playlist"
                                        style={{color: '#888', padding: '5px'}}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlaylistDetails;