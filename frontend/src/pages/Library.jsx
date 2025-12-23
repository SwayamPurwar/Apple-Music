import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import './Library.css';

const Library = () => {
    const navigate = useNavigate();

    const libraryItems = [
        { id: 'playlists', label: 'Playlists', icon: 'list-music', path: '/playlists' },
        { id: 'artists', label: 'Artists', icon: 'mic', path: '/artists' },
        { id: 'albums', label: 'Albums', icon: 'album', path: '/albums' },
        { id: 'songs', label: 'Songs', icon: 'music', path: '/songs' },
        { id: 'downloaded', label: 'Downloaded', icon: 'download', path: '/downloaded' },
    ];

    const getIcon = (type) => {
        switch(type) {
            case 'list-music': return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fa2d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
            case 'mic': return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fa2d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>;
            case 'album': return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fa2d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="3" x2="12" y2="21"></line></svg>;
            case 'music': return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fa2d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;
            case 'download': return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fa2d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
            default: return null;
        }
    };

    return (
        <section className="library-section">
            {/* UPDATED: Removed rightElement prop to show default Profile Avatar */}
            <MobileHeader title="Library" />

            <div className="library-menu">
                {libraryItems.map((item) => (
                    <div 
                        key={item.id} 
                        className="library-item" 
                        onClick={() => navigate(item.path)}
                    >
                        <div className="lib-icon-container">
                            {getIcon(item.icon)}
                        </div>
                        <div className="lib-text-container">
                            <span className="lib-label">{item.label}</span>
                            <svg className="chevron-right" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    </div>
                ))}
            </div>

            <div className="recently-added-preview">
                <h2 className="section-title">Recently Added</h2>
                <div className="empty-state-small">
                    <p>Your added music will appear here.</p>
                </div>
            </div>
        </section>
    );
};

export default Library;