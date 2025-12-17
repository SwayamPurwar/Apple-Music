import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    
    const NavItem = ({ to, icon, label }) => (
        <Link to={to} className={`nav-item ${path === to ? 'active' : ''}`}>
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
        </Link>
    );

    const handleLogout = () => {
        // Clear cookie properly
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
    };

    return (
        <div className="navigation">
            <div className="nav-scroll-area">
                {/* 1. Main Menu */}
                <div className="nav-group">
                    <NavItem to="/search" label="Search" icon={
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    } />
                    <NavItem to="/" label="Home" icon={
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="none"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"/><path d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z" opacity="0.3"/></svg>
                    } />
                    <NavItem to="/radio" label="Radio" icon={
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
                    } />
                </div>

                {/* 2. Library Section */}
                <div className="nav-group">
                    <div className="nav-header">Library</div>
                    <NavItem to="/liked-songs" label="Liked Songs" icon={
                        <div style={{ background: 'linear-gradient(135deg, #450af5, #c4efd9)', width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0.8' }}>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                    } />
                    <NavItem to="/upload" label="Recently Added" icon={<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 5 12 19"></polyline><polyline points="19 12 5 12"></polyline></svg>} />
                    <NavItem to="/songs" label="Songs" icon={<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>} />
                    <NavItem to="/albums" label="Albums" icon={<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>} />
                </div>

                {/* 3. Playlists Section */}
                <div className="nav-group">
                    <div className="nav-header">Playlists</div>
                    <NavItem to="/playlists" label="All Playlists" icon={<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>} />
                </div>

                {/* 4. User Section (Profile & Logout) */}
                <div className="nav-group" style={{marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #333'}}>
                    {/* NEW: Profile Link */}
                    <NavItem to="/profile" label="Profile" icon={
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    } />
                    
                    <div className="nav-item" onClick={handleLogout} style={{cursor: 'pointer'}}>
                         <span className="nav-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </span>
                        <span className="nav-label">Log Out</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigation;