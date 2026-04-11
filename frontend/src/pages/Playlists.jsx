import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists, addPlaylist, selectPlaylists } from '../redux/features/playlistSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MobileHeader from '../components/MobileHeader';
import './Playlists.css'; // <--- UPDATED IMPORT

const Playlists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(selectPlaylists);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
       axios.get(`${import.meta.env.VITE_API_URL}/playlists/my-playlists`, { withCredentials: true })
        .then(res => dispatch(setPlaylists(res.data.playlists || [])))
        .catch(err => console.error("Error fetching playlists:", err));
    }, [dispatch]);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        if (!newPlaylistName.trim()) return;

        setIsCreating(true);
        try {
            // Pick a random gradient for the new playlist cover placeholder if you want
            const res = await axios.post(
              `${import.meta.env.VITE_API_URL}/playlists/create`,
                { title: newPlaylistName, description: "My custom mix" }, 
                { withCredentials: true }
            );
            
            dispatch(addPlaylist(res.data.playlist));
            setShowModal(false); 
            setNewPlaylistName(""); 
        } catch (err) {
            alert("Failed to create playlist");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <section className="playlists-section">
            <MobileHeader 
                title="Playlists" 
                rightElement={
                    <button onClick={() => setShowModal(true)} style={{color:'#fa2d48', fontWeight:'bold', background:'none', border:'none'}}>New</button>
                } 
            />

            {/* Desktop Header */}
            <div className="playlists-header-wrapper desktop-only">
                <div className="playlists-header">
                    <h1>Playlists</h1>
                    <p>Your personal collections</p>
                </div>
                <button className="create-btn-floating" onClick={() => setShowModal(true)}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    New Playlist
                </button>
            </div>

            {/* Grid */}
            {playlists && playlists.length > 0 ? (
                <div className="playlists-grid">
                    {playlists.map(playlist => (
                        <div key={playlist._id} className="playlist-card" onClick={() => navigate(`/playlist/${playlist._id}`)}>
                            <div className="playlist-image-wrapper">
                                {playlist.poster ? (
                                    <img src={playlist.poster} alt={playlist.title} loading="lazy" />
                                ) : (
                                    /* Beautiful fallback gradient if no poster */
                                    <div className="placeholder-gradient" style={{
                                        background: playlist.songs.length > 0 
                                            ? 'linear-gradient(135deg, #fa2d48, #ff9a9e)' 
                                            : 'linear-gradient(135deg, #3a3a3c, #2c2c2e)'
                                    }}>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                                            <path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="playlist-info">
                                <h3>{playlist.title}</h3>
                                <p>{playlist.songs ? playlist.songs.length : 0} Songs</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state-container">
                    <div className="empty-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>
                        </svg>
                    </div>
                    <h2>No Playlists Yet</h2>
                    <p>Create your first playlist to get started.</p>
                    <button className="create-btn-floating" onClick={() => setShowModal(true)} style={{marginTop: '20px'}}>
                        Create New Playlist
                    </button>
                </div>
            )}

            {/* Modal - Same as before, just kept inline for completeness */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)} style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
                }}>
                    <div onClick={e => e.stopPropagation()} style={{
                        backgroundColor: '#1c1c1e', padding: '24px', borderRadius: '14px',
                        width: '320px', border: '1px solid #333', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                    }}>
                        <h3 style={{color: 'white', textAlign: 'center', marginBottom: '20px'}}>New Playlist</h3>
                        <form onSubmit={handleCreateSubmit}>
                            <input 
                                type="text" autoFocus placeholder="Playlist Name"
                                value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
                                    backgroundColor: '#2c2c2e', color: 'white', fontSize: '16px', marginBottom: '20px', outline: 'none'
                                }}
                            />
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button type="button" onClick={() => setShowModal(false)} style={{flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#3a3a3c', color: '#fa2d48', fontSize: '15px', cursor: 'pointer'}}>Cancel</button>
                                <button type="submit" disabled={isCreating} style={{flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#fa2d48', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer'}}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Playlists;