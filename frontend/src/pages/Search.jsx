import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredSongs, selectFilteredSongs, playFromContext } from '../redux/features/songSlice';
import axios from 'axios';
import MobileHeader from '../components/MobileHeader'; 
import './Search.css';

const Search = () => {
    const dispatch = useDispatch();
    const filteredSongs = useSelector(selectFilteredSongs);
    const [searchQuery, setSearchQuery] = useState('');

    const performSearch = (query) => {
        setSearchQuery(query);
        if(query.length > 0){
            axios.get(`http://localhost:3000/songs/search-songs?text=${query}`,{ withCredentials: true })
            .then(res => dispatch(setFilteredSongs(res.data.songs)))
            .catch(err => console.error(err));
        } else {
            dispatch(setFilteredSongs([]));
        }
    }

    const categories = [
        { id: 1, name: 'Pop', gradient: 'linear-gradient(135deg, #ff416c, #ff4b2b)' },
        { id: 2, name: 'Hip-Hop', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
        { id: 3, name: 'Chill', gradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)' },
        { id: 4, name: 'Hits', gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' },
        { id: 5, name: 'Dance', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
        { id: 6, name: 'R&B', gradient: 'linear-gradient(135deg, #C33764, #1D2671)' },
        { id: 7, name: 'Rock', gradient: 'linear-gradient(135deg, #ed213a, #93291e)' },
        { id: 8, name: 'Jazz', gradient: 'linear-gradient(135deg, #00b09b, #96c93d)' },
    ];

    return (
        <section className="search-section">
            <div className="search-container-inner">
                
                {/* Mobile Header (Hidden on Desktop via CSS) */}
                <MobileHeader title="Search" />

                {/* Desktop Header (Hidden on Mobile via CSS) */}
                <div className="desktop-search-header">
                    <h1>Search</h1>
                </div>

                <div className="search-bar-sticky">
                    <div className="search-input-wrapper">
                        {/* Icon */}
                        <svg className="search-icon-input" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        
                        {/* Input */}
                        <input 
                            type="text" 
                            placeholder="Artists, Songs, Lyrics" 
                            value={searchQuery}
                            onChange={(e) => performSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="search-content">
                    {searchQuery ? (
                        <div className="results-container">
                             <div className="songs-list-rows">
                                {filteredSongs.length > 0 ? filteredSongs.map((song) => (
                                    <div key={song._id} className="song-row" onClick={() => dispatch(playFromContext({song, list: filteredSongs}))}>
                                        <div className="song-row-left">
                                            <img src={song.poster} className="song-row-img" alt="" />
                                            <div className="song-row-info">
                                                <div className="song-row-title">{song.title}</div>
                                                <div className="song-row-artist">{song.artist}</div>
                                            </div>
                                        </div>
                                    </div>
                                )) : <div className="no-results"><p>No results found.</p></div>}
                            </div>
                        </div>
                    ) : (
                        <div className="browse-categories">
                            <h2 className="section-title">Browse All</h2>
                            <div className="category-grid">
                                {categories.map(cat => (
                                    <div 
                                        key={cat.id} 
                                        className="category-card" 
                                        style={{ background: cat.gradient }}
                                        onClick={() => performSearch(cat.name)}
                                    >
                                        <span className="category-name">{cat.name}</span>
                                        <div className="card-decoration"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Search;