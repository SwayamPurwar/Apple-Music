import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { playFromContext, selectCurrentSong } from '../redux/features/songSlice';
import { Link } from 'react-router-dom';
import './Songs.css';
import AddToPlaylistModal from '../components/AddToPlaylistModal';
import SuccessPopup from '../components/SuccessPopup';
// 1. IMPORT DOWNLOAD SERVICE
import { toggleDownload, getDownloadedSongs } from '../services/downloadService';

const Songs = () => {
    const [songs, setSongs] = useState([]);
    const [likedSongIds, setLikedSongIds] = useState(new Set());
    // 2. STATE FOR DOWNLOADS
    const [downloadedIds, setDownloadedIds] = useState(new Set());
    
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();
    const currentSong = useSelector(selectCurrentSong);

    useEffect(() => {
        fetchSongs();
        fetchLikedSongs();
        fetchDownloadedSongs(); // <--- CALL THIS
    }, []);

    const fetchSongs = () => {
axios.get(`${import.meta.env.VITE_API_URL}/songs/get-songs`, { withCredentials: true })
            .then(res => setSongs(res.data.songs))
            .catch(err => console.error(err));
    };

    const fetchLikedSongs = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/songs/liked-songs`, { withCredentials: true })
            .then(res => {
                const ids = new Set(res.data.likedSongs.map(s => s._id));
                setLikedSongIds(ids);
            })
            .catch(err => console.error(err));
    };

    // 3. FETCH DOWNLOADED SONGS
    const fetchDownloadedSongs = () => {
        const localSongs = getDownloadedSongs();
        const ids = new Set(localSongs.map(s => s._id));
        setDownloadedIds(ids);
    };

    const handlePlaySong = (song) => {
        dispatch(playFromContext({ song, list: songs }));
    };

    const handleToggleLike = (e, songId) => {
        e.stopPropagation();
        const isLiked = likedSongIds.has(songId);
        const newLikedIds = new Set(likedSongIds);
        if (isLiked) newLikedIds.delete(songId);
        else newLikedIds.add(songId);
        setLikedSongIds(newLikedIds);

        axios.post(`${import.meta.env.VITE_API_URL}/songs/like`, { songId }, { withCredentials: true })
            .catch(err => setLikedSongIds(likedSongIds));
    };

    // 4. HANDLE DOWNLOAD TOGGLE
    const handleToggleDownload = (e, song) => {
        e.stopPropagation();
        toggleDownload(song); // Save to local storage

        // Update UI
        const newSet = new Set(downloadedIds);
        if (newSet.has(song._id)) {
            newSet.delete(song._id);
        } else {
            newSet.add(song._id);
        }
        setDownloadedIds(newSet);
    };

    const handleDelete = (e, songId) => {
        e.stopPropagation();
        if(!window.confirm("Are you sure you want to delete this song?")) return;

        axios.delete(`${import.meta.env.VITE_API_URL}/songs/${songId}`, { withCredentials: true })
            .then(() => setSongs(songs.filter(s => s._id !== songId)))
            .catch(() => alert("Error deleting song"));
    };

    const handleAddToPlaylist = (e, song) => {
        e.stopPropagation();
        setSelectedSong(song);
        setShowModal(true);
    };

    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="songs-section">
            <div className="songs-header">
                <h2>Library</h2>
                <input 
                    type="text" 
                    placeholder="Filter by title or artist..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {showPopup && <SuccessPopup message="Added to Playlist" onClose={() => setShowPopup(false)} />}

            {showModal && (
                <AddToPlaylistModal 
                    song={selectedSong} 
                    onClose={() => setShowModal(false)}
                    onSuccess={() => { setShowModal(false); setShowPopup(true); }}
                />
            )}

            <div className="songs-table">
                <div className="songs-table-header">
                    <div className="th-index">#</div>
                    <div className="th-title">Title</div>
                    <div className="th-artist">Artist</div>
                    <div className="th-actions">Actions</div>
                </div>

                <div className="songs-table-body">
                    {filteredSongs.map((song, index) => {
                        const isLiked = likedSongIds.has(song._id);
                        const isDownloaded = downloadedIds.has(song._id); // CHECK STATUS

                        return (
                            <div 
                                key={song._id} 
                                className={`songs-table-row ${currentSong?._id === song._id ? 'active-row' : ''}`}
                                onClick={() => handlePlaySong(song)}
                            >
                                <div className="td-index">
                                    <span className="index-num">{index + 1}</span>
                                    <span className="play-icon">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                    </span>
                                </div>
                                
                                <div className="td-title">
                                    <img src={song.poster} alt="" className="table-poster" />
                                    <span>{song.title}</span>
                                </div>

                                <div className="td-artist">
                                    <Link 
                                        to={`/artist/${encodeURIComponent(song.artist)}`}
                                        onClick={(e) => e.stopPropagation()} 
                                        className="artist-link"
                                    >
                                        {song.artist}
                                    </Link>
                                </div>

                                <div className="td-actions">
                                    <button 
                                        className="action-btn" 
                                        onClick={(e) => handleToggleLike(e, song._id)} 
                                        title={isLiked ? "Unlike" : "Like"}
                                    >
                                        {isLiked ? (
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fa2d48" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                        )}
                                    </button>

                                    {/* 5. DOWNLOAD BUTTON */}
                                    <button 
                                        className="action-btn" 
                                        onClick={(e) => handleToggleDownload(e, song)} 
                                        title={isDownloaded ? "Remove Download" : "Download"}
                                    >
                                        {isDownloaded ? (
                                             /* Filled Circle with Arrow (Downloaded) */
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fa2d48" stroke="#fa2d48" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 13h2v-6h-2v6zm1-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path><polyline points="8 12 12 16 16 12" stroke="#fff" strokeWidth="2" fill="none"></polyline><line x1="12" y1="8" x2="12" y2="16" stroke="#fff" strokeWidth="2"></line></svg>
                                        ) : (
                                            /* Outline Download Icon */
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        )}
                                    </button>

                                    <button className="action-btn" onClick={(e) => handleAddToPlaylist(e, song)} title="Add to Playlist">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    
                                    <button className="action-btn delete-btn" onClick={(e) => handleDelete(e, song._id)} title="Delete Song">
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Songs;