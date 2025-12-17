import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists, addPlaylist, selectPlaylists } from '../redux/features/playlistSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MobileHeader from '../components/MobileHeader';
import './Albums.css'; 

const Playlists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(selectPlaylists);
    const navigate = useNavigate();

    // --- NEW: State for Custom Modal ---
    const [showModal, setShowModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    // 1. Fetch Playlists
    useEffect(() => {
        axios.get("http://localhost:3000/playlists/my-playlists", { withCredentials: true })
        .then(res => dispatch(setPlaylists(res.data.playlists || [])))
        .catch(err => console.error("Error fetching playlists:", err));
    }, [dispatch]);

    // 2. Handle Submit (Replacing prompt)
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        if (!newPlaylistName.trim()) return;

        setIsCreating(true);
        try {
            const res = await axios.post(
                "http://localhost:3000/playlists/create", 
                { title: newPlaylistName, description: "My awesome playlist" }, 
                { withCredentials: true }
            );
            
            dispatch(addPlaylist(res.data.playlist));
            setShowModal(false); // Close modal
            setNewPlaylistName(""); // Reset input
        } catch (err) {
            console.error(err);
            alert("Failed to create playlist");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <section className="albums-section" style={{ minHeight: '100vh', padding: '20px', position: 'relative' }}>
            <MobileHeader 
                title="Playlists" 
                subTitle="Your Mixes" 
                rightElement={
                    <button 
                        onClick={() => setShowModal(true)}
                        style={{
                            backgroundColor: '#fa2d48',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer'
                        }}
                    >
                        + New
                    </button>
                }
            />

            {/* --- Playlist Grid or Empty State --- */}
            {playlists && playlists.length > 0 ? (
                <div className="albums-grid">
                    {playlists.map(playlist => (
                        <div key={playlist._id} className="album-card" onClick={() => navigate(`/playlist/${playlist._id}`)}>
                            <div className="album-image-container">
                                <img 
                                    src={playlist.poster || "https://placehold.co/400?text=Playlist"} 
                                    alt={playlist.title} 
                                    loading="lazy" 
                                />
                            </div>
                            <div className="album-info">
                                <div className="album-title">{playlist.title}</div>
                                <div className="album-artist">{playlist.songs ? playlist.songs.length : 0} Songs</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#fff', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No Playlists Yet</h2>
                    <p style={{ color: '#888', marginBottom: '20px' }}>Create your first playlist to get started.</p>
                    <button 
                        onClick={() => setShowModal(true)}
                        style={{ backgroundColor: '#fa2d48', color: 'white', padding: '12px 24px', borderRadius: '30px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Create New Playlist
                    </button>
                </div>
            )}

            {/* --- NEW: Beautiful Dark Modal --- */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim background
                    backdropFilter: 'blur(5px)', // iOS blur effect
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#1c1c1e', // Apple Dark Gray
                        padding: '24px',
                        borderRadius: '16px',
                        width: '90%',
                        maxWidth: '350px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        border: '1px solid #333'
                    }}>
                        <h3 style={{ color: 'white', margin: '0 0 16px 0', textAlign: 'center', fontSize: '18px' }}>
                            New Playlist
                        </h3>
                        
                        <form onSubmit={handleCreateSubmit}>
                            <input 
                                type="text" 
                                autoFocus
                                placeholder="Playlist Name"
                                value={newPlaylistName}
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#2c2c2e',
                                    color: 'white',
                                    fontSize: '16px',
                                    marginBottom: '20px',
                                    outline: 'none'
                                }}
                            />
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        backgroundColor: '#3a3a3c',
                                        color: '#fa2d48', // Apple Red
                                        fontSize: '16px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isCreating}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        backgroundColor: '#fa2d48',
                                        color: 'white',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        opacity: isCreating ? 0.7 : 1
                                    }}
                                >
                                    {isCreating ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Playlists;