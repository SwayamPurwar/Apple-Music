import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation = () => {
    const location = useLocation();
    const path = location.pathname;

    const NavItem = ({ to, label, icon }) => {
        // Check if path starts with /library OR /playlists for active state
        const isActive = path === to || (to === '/library' && path === '/playlists');
        
        return (
            <Link to={to} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
                <div className="bottom-nav-icon">
                    {icon}
                </div>
                <span className="bottom-nav-label">{label}</span>
            </Link>
        );
    };

    return (
        <div className="bottom-navigation">
            <NavItem 
                to="/" 
                label="Home" 
                icon={<svg viewBox="0 0 24 24" width="24" height="24" fill={path === '/' ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>}
            />
            
            <NavItem 
                to="/radio" 
                label="Radio" 
                icon={<svg viewBox="0 0 24 24" width="24" height="24" fill={path === '/radio' ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>}
            />

            {/* Point to NEW Library Page */}
            <NavItem 
                to="/library" 
                label="Library" 
                icon={<svg viewBox="0 0 24 24" width="24" height="24" fill={path.includes('/library') || path.includes('/playlists') ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>}
            />

            <NavItem 
                to="/search" 
                label="Search" 
                icon={<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>}
            />
        </div>
    );
};

export default BottomNavigation;