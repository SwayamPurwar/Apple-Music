import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import EditProfileModal from '../components/EditProfileModal'; // Import
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false); // State for modal
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/auth/me", { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => navigate('/login'));

        axios.get("http://localhost:3000/playlists/my-playlists", { withCredentials: true })
            .then(res => setPlaylists(res.data.playlists))
            .catch(err => console.error(err));
    }, [navigate]);

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
    };

    if (!user) return <div className="profile-loading">Loading...</div>;

    const initials = user.username ? user.username.charAt(0).toUpperCase() : 'U';

    return (
        <section className="profile-section">
            <MobileHeader title="Account" />

            {/* --- Render Modal --- */}
            {showEditModal && (
                <EditProfileModal 
                    user={user} 
                    onClose={() => setShowEditModal(false)} 
                    onUpdate={(updatedUser) => setUser(updatedUser)}
                />
            )}

            <div className="profile-container">
                <div className="user-card">
                    <div className="avatar-large">
                        {initials}
                    </div>
                    <h1 className="user-name">{user.username}</h1>
                    <p className="user-handle">{user.email}</p>
                    
                    <div className="user-stats">
                        <div className="stat-item">
                            <span className="stat-num">{user.likedSongs ? user.likedSongs.length : 0}</span>
                            <span className="stat-label">Liked</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">{playlists.length}</span>
                            <span className="stat-label">Playlists</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">{user.followers ? user.followers.length : 0}</span>
                            <span className="stat-label">Followers</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">{user.following ? user.following.length : 0}</span>
                            <span className="stat-label">Following</span>
                        </div>
                    </div>

                    <div className="user-actions">
                        {/* Update OnClick */}
                        <button className="btn-secondary" onClick={() => setShowEditModal(true)}>
                            Edit Profile
                        </button>
                        <button className="btn-primary" onClick={handleLogout}>Sign Out</button>
                    </div>
                </div>

                <div className="profile-content">
                    <h2 className="section-title">My Public Playlists</h2>
                    {playlists.length > 0 ? (
                        <div className="profile-grid">
                            {playlists.map(pl => (
                                <div key={pl._id} className="mini-card" onClick={() => navigate(`/playlist/${pl._id}`)}>
                                    <img src={pl.poster || "https://placehold.co/400?text=Playlist"} alt={pl.title} />
                                    <div className="mini-card-info">
                                        <span className="mini-title">{pl.title}</span>
                                        <span className="mini-sub">{pl.songs.length} Songs</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>You haven't created any playlists yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Profile;