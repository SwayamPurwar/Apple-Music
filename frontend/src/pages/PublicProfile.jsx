import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Assuming you might store current user in redux later, but we'll fetch 'me' to check following status
import MobileHeader from '../components/MobileHeader';
import './Profile.css'; // Reuse existing styles

const PublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [profileUser, setProfileUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // 1. Fetch the Public Profile Data
        axios.get(`http://localhost:3000/auth/user/${id}`, { withCredentials: true })
            .then(res => setProfileUser(res.data.user))
            .catch(() => navigate('/')); // Redirect if user not found

        // 2. Fetch Current User (Me) to check if I am following them
        axios.get("http://localhost:3000/auth/me", { withCredentials: true })
            .then(res => setCurrentUser(res.data.user))
            .catch(err => console.error(err));

        // 3. Fetch User's Playlists (Optional - requires backend support)
        // axios.get(`http://localhost:3000/playlists/user/${id}`) ...
    }, [id, navigate]);

    // Check following status once both users are loaded
    useEffect(() => {
        if (currentUser && profileUser) {
            const following = currentUser.following.includes(profileUser._id);
            setIsFollowing(following);
        }
    }, [currentUser, profileUser]);

    const handleFollowToggle = () => {
        axios.post(`http://localhost:3000/auth/follow/${id}`, {}, { withCredentials: true })
            .then(res => {
                setIsFollowing(res.data.isFollowing);
                // Update local stats for immediate feedback
                setProfileUser(prev => ({
                    ...prev,
                    followers: res.data.isFollowing 
                        ? [...prev.followers, currentUser._id]
                        : prev.followers.filter(fid => fid !== currentUser._id)
                }));
            })
            .catch(err => console.error(err));
    };

    if (!profileUser) return <div className="profile-loading">Loading...</div>;

    const initials = profileUser.username ? profileUser.username.charAt(0).toUpperCase() : 'U';

    return (
        <section className="profile-section">
            <MobileHeader title={profileUser.username} />

            <div className="profile-container">
                <div className="user-card">
                    <div className="avatar-large" style={{background: 'linear-gradient(135deg, #fa2d48, #ff9a9e)'}}>
                        {initials}
                    </div>
                    <h1 className="user-name">{profileUser.username}</h1>
                    <p className="user-handle">{profileUser.email}</p>
                    
                    <div className="user-stats">
                        <div className="stat-item">
                            <span className="stat-num">{profileUser.likedSongs ? profileUser.likedSongs.length : 0}</span>
                            <span className="stat-label">Liked</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">{profileUser.followers ? profileUser.followers.length : 0}</span>
                            <span className="stat-label">Followers</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">{profileUser.following ? profileUser.following.length : 0}</span>
                            <span className="stat-label">Following</span>
                        </div>
                    </div>

                    <div className="user-actions">
                        {currentUser && currentUser._id !== profileUser._id && (
                            <button 
                                className={isFollowing ? "btn-secondary" : "btn-primary"} 
                                onClick={handleFollowToggle}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        )}
                    </div>
                </div>

                <div className="profile-content">
                    <h2 className="section-title">Public Playlists</h2>
                    <div className="empty-state">
                        <p>No public playlists yet.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PublicProfile;