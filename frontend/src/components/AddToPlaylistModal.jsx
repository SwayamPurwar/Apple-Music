import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddToPlaylistModal.css';

const AddToPlaylistModal = ({ song, onClose, onSuccess }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // Fetch user's playlists
axios.get(`${import.meta.env.VITE_API_URL}/playlists/my-playlists`, {
            withCredentials: true
        })
        .then(res => setPlaylists(res.data.playlists))
        .catch(err => console.error(err));
    }, []);

    const handleAddToPlaylist = (playlistId) => {
      axios.post(`${import.meta.env.VITE_API_URL}/playlists/add-song`, {
            playlistId,
            songId: song._id
        }, {
            withCredentials: true
        })
        .then(() => {
            // --- CHANGE IS HERE ---
            // Instead of alert(), we call onSuccess() if it exists.
            // This tells the parent to close the modal AND show the popup.
            if (onSuccess) {
                onSuccess();
            } else {
                onClose();
            }
        })
        .catch(err => {
            alert(err.response?.data?.message || "Error adding song");
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Add to Playlist</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="playlist-list-modal">
                    {playlists.length > 0 ? (
                        playlists.map(pl => (
                            <div 
                                key={pl._id} 
                                className="playlist-item-modal"
                                onClick={() => handleAddToPlaylist(pl._id)}
                            >
                                <img src={pl.poster} alt="" />
                                <span>{pl.title}</span>
                            </div>
                        ))
                    ) : (
                        <p className="no-playlists">No playlists found. Create one first!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddToPlaylistModal;