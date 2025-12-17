import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, selectIsPlaying, playFromContext } from '../redux/features/songSlice';
import EditPlaylistModal from '../components/EditPlaylistModal'; // Import Modal
import './PlaylistDetails.css';

const PlaylistDetails = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false); // Modal State
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:3000/playlists/${id}`, {
            withCredentials: true
        })
        .then(response => {
            setPlaylist(response.data.playlist);
        })
        .catch(err => console.error("Error fetching playlist:", err));
    }, [id]);

    const handlePlaySong = (song) => {
        dispatch(playFromContext({ song, list: playlist.songs }));
    };

    const handleRemoveSong = (e, songId) => {
        e.stopPropagation();
        axios.post("http://localhost:3000/playlists/remove-song", {
            playlistId: id,
            songId: songId
        }, {
            withCredentials: true
        })
        .then(() => {
            setPlaylist(prev => ({
                ...prev,
                songs: prev.songs.filter(s => s._id !== songId)
            }));
        })
        .catch(err => alert("Failed to remove song"));
    };

    if (!playlist) return <div className="playlist-loading">Loading...</div>;

    return (
        <section className="playlist-details-section">
            <div className="playlist-hero">
                <div className="playlist-cover-shadow">
                    <img src={playlist.poster} alt={playlist.title} className="playlist-cover-lg" />
                </div>
                <div className="playlist-meta">
                    <span className="playlist-type">Playlist</span>
                    
                    {/* Header Row with Edit Button */}
                    <div className="playlist-title-row" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <h1 className="playlist-title-lg" style={{fontSize: '60px', marginBottom: '0'}}>{playlist.title}</h1>
                        <button 
                            className="edit-btn" 
                            onClick={() => setShowEditModal(true)}
                            title="Edit Details"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                    </div>

                    <p className="playlist-desc">{playlist.description}</p>
                    <div className="playlist-stats">
                        <span className="owner-name">You</span> • {playlist.songs.length} songs
                    </div>
                </div>
            </div>

            <div className="playlist-actions">
                <button className="play-big-btn">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>

            <div className="songs-table">
                <div className="songs-table-header">
                    <div className="th-index">#</div>
                    <div className="th-title">Title</div>
                    <div className="th-artist">Artist</div>
                    <div className="th-date">Date Added</div>
                    <div className="th-duration"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                </div>

                <div className="songs-table-body">
                    {playlist.songs.length > 0 ? (
                        playlist.songs.map((song, index) => (
                            <div key={song._id} className="songs-table-row" onClick={() => handlePlaySong(song)}>
                                <div className="td-index">
                                    <span className="index-num">{index + 1}</span>
                                    <span className="play-icon">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </span>
                                </div>
                                <div className="td-title">
                                    <img src={song.poster} alt="" className="table-poster" />
                                    <div className="title-text">
                                        <span>{song.title}</span>
                                        <span className="mobile-artist">{song.artist}</span>
                                    </div>
                                </div>
                                <div className="td-artist">{song.artist}</div>
                                <div className="td-date">2 days ago</div>
                                
                                <div className="td-duration" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '15px' }}>
                                    <span className="duration-text">3:45</span>
                                    <button 
                                        className="remove-song-btn"
                                        title="Remove from Playlist"
                                        onClick={(e) => handleRemoveSong(e, song._id)}
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-playlist">
                            <p>This playlist is empty.</p>
                            <span>Go to Songs or Search to add music!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* RENDER MODAL */}
            {showEditModal && (
                <EditPlaylistModal 
                    playlist={playlist}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={(updatedPlaylist) => setPlaylist(prev => ({
                        ...prev,
                        title: updatedPlaylist.title,
                        description: updatedPlaylist.description
                    }))}
                />
            )}
        </section>
    );
};

export default PlaylistDetails;