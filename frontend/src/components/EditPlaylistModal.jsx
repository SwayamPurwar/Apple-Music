import React, { useState } from 'react';
import axios from 'axios';
import './AddToPlaylistModal.css'; // Reusing modal styles

const EditPlaylistModal = ({ playlist, onClose, onUpdate }) => {
    const [title, setTitle] = useState(playlist.title);
    const [desc, setDesc] = useState(playlist.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:3000/playlists/${playlist._id}`, {
            title,
            description: desc
        }, {
            withCredentials: true
        })
        .then(res => {
            onUpdate(res.data.playlist); // Notify parent component
            onClose();
        })
        .catch(err => alert("Failed to update playlist"));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Edit Details</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Playlist Name"
                        className="modal-input"
                        required
                    />
                    <textarea 
                        value={desc} 
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Description"
                        className="modal-input"
                        rows="3"
                    />
                    <button type="submit" className="save-btn">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditPlaylistModal;