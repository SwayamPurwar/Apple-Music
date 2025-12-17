import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Fetch User Details
        axios.get("http://localhost:3000/auth/me", { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => navigate('/login'));

        // 2. Fetch User Playlists for the grid
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
            {/* Mobile Header (Hidden on Desktop) */}
            <MobileHeader title="Account" />

            <div className="profile-container">
                {/* --- 1. User Card --- */}
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
                            <span className="stat-num">0</span>
                            <span className="stat-label">Followers</span>
                        </div>
                    </div>

                    <div className="user-actions">
                        <button className="btn-secondary">Edit Profile</button>
                        <button className="btn-primary" onClick={handleLogout}>Sign Out</button>
                    </div>
                </div>

                {/* --- 2. Content Section (Playlists) --- */}
                <div className="profile-content">
                    <h2 className="section-title">My Public Playlists</h2>
                    {playlists.length > 0 ? (
                        <div className="profile-grid">
                            {playlists.map(pl => (
                                <div key={pl._id} className="mini-card" onClick={() => navigate(`/playlist/${pl._id}`)}>
                                    <img src={pl.poster} alt={pl.title} />
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