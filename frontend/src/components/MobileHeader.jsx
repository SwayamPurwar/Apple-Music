import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MobileHeader.css';

const MobileHeader = ({ title, subTitle, rightElement }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => {});
    }, []);

    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

    return (
        <div className="mobile-header-container">
            <div className="header-text">
                <h1>{title}</h1>
                {subTitle && <p>{subTitle}</p>}
            </div>
            
            <div className="header-right">
                {rightElement ? rightElement : (
                    <div className="header-profile" onClick={() => navigate('/profile')}>
                        <div className="profile-placeholder">
                            {user ? getInitials(user.username) : 
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileHeader;