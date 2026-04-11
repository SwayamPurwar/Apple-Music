import React, { useState } from 'react';
import axios from 'axios';
import './AddToPlaylistModal.css'; // Reusing your modal styles

const EditProfileModal = ({ user, onClose, onUpdate }) => {
    const [username, setUsername] = useState(user.username);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        try {
       const res = await axios.put(`${import.meta.env.VITE_API_URL}/auth/update`, {
                username
            }, {
                withCredentials: true
            });
            
            onUpdate(res.data.user); // Update parent state
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Edit Profile</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    {error && <p style={{color: '#fa2d48', fontSize: '14px', margin: 0}}>{error}</p>}
                    
                    <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                        <label style={{color:'#aaa', fontSize:'12px'}}>Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="modal-input"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="save-btn" 
                        disabled={isLoading}
                        style={{opacity: isLoading ? 0.7 : 1}}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;