import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { playFromContext } from '../redux/features/songSlice';
import { getDownloadedSongs, toggleDownload } from '../services/downloadService';
import MobileHeader from '../components/MobileHeader';
import './PlaylistDetails.css'; // Reusing existing styles

const Downloaded = () => {
    const [songs, setSongs] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setSongs(getDownloadedSongs());
    }, []);

    const handlePlay = (song) => {
        dispatch(playFromContext({ song, list: songs }));
    };

    const handleRemove = (e, song) => {
        e.stopPropagation();
        toggleDownload(song);
        setSongs(getDownloadedSongs()); 
    };

    return (
        <section className="playlist-details-section">
            <MobileHeader title="Downloaded" />
            <div className="playlist-hero" style={{background: 'linear-gradient(to bottom, #1c1c1e, #000)'}}>
                <div className="playlist-cover-shadow" style={{background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#fa2d48" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </div>
                <div className="playlist-meta">
                    <span className="playlist-type">Library</span>
                    <h1 className="playlist-title-lg">Downloaded</h1>
                    <p className="playlist-desc">{songs.length} Songs • Local Storage</p>
                </div>
            </div>
            
            <div className="songs-table">
                {songs.length > 0 ? (
                    <div className="songs-table-body">
                        {songs.map((song, index) => (
                            <div key={song._id} className="songs-table-row" onClick={() => handlePlay(song)}>
                                <div className="td-index"><span className="index-num">{index + 1}</span></div>
                                <div className="td-title">
                                    <img src={song.poster} alt="" className="table-poster" />
                                    <span>{song.title}</span>
                                </div>
                                <div className="td-artist">{song.artist}</div>
                                <div className="td-action">
                                    <button className="btn-text-only" style={{color: '#fa2d48', fontSize: '12px'}} onClick={(e) => handleRemove(e, song)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state" style={{padding: '40px', textAlign: 'center', color: '#888'}}>
                        <p>No downloaded music.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Downloaded;