import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playFromContext, selectSongs, setSongs } from '../redux/features/songSlice';
import axios from 'axios';
import MobileHeader from '../components/MobileHeader';
import './Radio.css';

const Radio = () => {
    const dispatch = useDispatch();
    const allSongs = useSelector(selectSongs);
    const [stationSong, setStationSong] = useState(null);

    // Fetch songs if empty (to ensure we have music to play)
    useEffect(() => {
        if (allSongs.length === 0) {
            axios.get("http://localhost:3000/songs/get-songs", { withCredentials: true })
                .then(res => dispatch(setSongs(res.data.songs)));
        }
    }, [allSongs, dispatch]);

    // Pick a random song artwork for the "My Radio" cover
    useEffect(() => {
        if (allSongs.length > 0 && !stationSong) {
            setStationSong(allSongs[Math.floor(Math.random() * allSongs.length)]);
        }
    }, [allSongs, stationSong]);

    const handleStartRadio = (mood = null) => {
        if (allSongs.length === 0) return;
        
        let songsToPlay = [...allSongs];
        
        // Simple mock filtering for "Stations"
        if (mood) {
            const moodLower = mood.toLowerCase();
            const filtered = allSongs.filter(s => 
                s.title.toLowerCase().includes(moodLower) || 
                s.artist.toLowerCase().includes(moodLower)
            );
            if (filtered.length > 0) songsToPlay = filtered;
        }

        const shuffled = songsToPlay.sort(() => 0.5 - Math.random());
        dispatch(playFromContext({ song: shuffled[0], list: shuffled }));
    };

    const radioStations = [
        { id: 1, name: 'Chill Station', mood: 'chill', color: 'linear-gradient(135deg, #2193b0, #6dd5ed)' },
        { id: 2, name: 'Pop Hits', mood: 'pop', color: 'linear-gradient(135deg, #ff9a9e, #fecfef)' },
        { id: 3, name: 'Hip-Hop Radio', mood: 'rap', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
        { id: 4, name: 'Classic Rock', mood: 'rock', color: 'linear-gradient(135deg, #434343, #000000)' },
        { id: 5, name: 'Dance Mix', mood: 'dance', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
        { id: 6, name: 'R&B Vibes', mood: 'r&b', color: 'linear-gradient(135deg, #cd9cf2, #f6f3ff)' },
    ];

    return (
        <section className="radio-section">
            <MobileHeader title="Radio" subTitle="Curated stations for you" />

            <div className="radio-container-inner">
                {/* Desktop Header */}
                <div className="desktop-radio-header">
                    <h1>Radio</h1>
                    <p>Curated stations just for you</p>
                </div>

                {/* HERO CARD - My Station */}
                <div className="radio-hero-card" onClick={() => handleStartRadio()}>
                    <div className="hero-gradient-overlay"></div>
                    
                    <div className="radio-hero-content">
                        <span className="live-badge">PERSONAL STATION</span>
                        <h2 className="hero-title">My<br />Station</h2>
                        <p className="hero-subtitle">Your favorites, ready to go.</p>
                        
                        <button className="hero-play-btn-small">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            Play
                        </button>
                    </div>

                    <div className="radio-hero-art">
                        {stationSong ? (
                            <img src={stationSong.poster} alt="Station Art" />
                        ) : (
                            <div className="placeholder-art" />
                        )}
                    </div>
                </div>

                {/* Stations Grid */}
                <div className="stations-section">
                    <h2 className="section-title">Stations by Mood</h2>
                    <div className="stations-grid">
                        {radioStations.map(station => (
                            <div 
                                key={station.id} 
                                className="station-card"
                                style={{ background: station.color }}
                                onClick={() => handleStartRadio(station.mood)}
                            >
                                <span className="station-name">{station.name}</span>
                                <div className="station-play-icon">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Radio;