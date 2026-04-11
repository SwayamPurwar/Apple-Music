import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongs, setCurrentSong, selectSongs } from '../redux/features/songSlice';
import axios from 'axios';
import MobileHeader from '../components/MobileHeader'; 
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/songs/get-songs`, { withCredentials: true })
        .then(res => dispatch(setSongs(res.data.songs)));
    }, [dispatch]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const handlePlay = (song) => dispatch(setCurrentSong(song));

    // Helper to render a scrollable row
    const SongRow = ({ title, data }) => (
        <div className="content-row">
            <div className="row-header">
                <h2>{title}</h2>
                <span className="see-all">See All</span>
            </div>
            <div className="songs-scroll-container">
                {data.map(song => (
                    <div key={song._id} className="song-card" onClick={() => handlePlay(song)}>
                        <div className="card-image-wrapper">
                            <img src={song.poster} alt={song.title} loading="lazy" />
                            <div className="play-overlay">
                                <div className="play-circle">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="card-info">
                            <div className="card-title">{song.title}</div>
                            <div className="card-artist">{song.artist}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="home-section">
            <MobileHeader title="Listen Now" />

            <div className="home-header desktop-only">
                <h1 className="greeting-text">{getGreeting()}</h1>
            </div>

            <div className="home-content">
                {/* Hero Banner (Featured) */}
                {songs.length > 0 && (
                    <div className="hero-banner" onClick={() => handlePlay(songs[0])}>
                        <div className="hero-bg-blur" style={{backgroundImage: `url(${songs[0].poster})`}}></div>
                        <div className="hero-content">
                            <span className="hero-tag">Featured Premiere</span>
                            <h2 className="hero-title">{songs[0].title}</h2>
                            <p className="hero-artist">{songs[0].artist}</p>
                        </div>
                    </div>
                )}

                {/* Simulated Sections */}
                {songs.length > 0 && (
                    <>
                        <SongRow title="Top Picks for You" data={songs.slice(0, 5)} />
                        <SongRow title="New Releases" data={[...songs].reverse().slice(0, 5)} />
                        <SongRow title="Heavy Rotation" data={songs.slice(2, 7)} />
                        <SongRow title="Chill Mix" data={songs.slice(1, 6)} />
                    </>
                )}
            </div>
        </section>
    )
}

export default Home;