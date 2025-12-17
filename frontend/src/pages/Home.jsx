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
        axios.get("http://localhost:3000/songs/get-songs", { withCredentials: true })
        .then(res => dispatch(setSongs(res.data.songs)));
    }, [dispatch]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const handlePlay = (song) => dispatch(setCurrentSong(song));

    return (
        <section className="home-section">
            <MobileHeader title={getGreeting()} />

            <div className="home-header desktop-only">
                <h1 className="greeting-text">{getGreeting()}</h1>
            </div>

            <div className="home-content">
                {songs.length > 0 && (
                    <div className="hero-banner" onClick={() => handlePlay(songs[0])}>
                        <div className="hero-bg-blur" style={{backgroundImage: `url(${songs[0].poster})`}}></div>
                        <div className="hero-content">
                            <img src={songs[0].poster} alt="" className="hero-image" />
                            <div className="hero-info">
                                <span className="hero-tag">Featured Track</span>
                                <h2 className="hero-title">{songs[0].title}</h2>
                                <p className="hero-artist">{songs[0].artist}</p>
                                <button className="hero-play-btn">Play Now</button>
                            </div>
                        </div>
                    </div>
                )}

                {songs.length > 0 && (
                    <div className="content-row">
                        <div className="row-header"><h2>Top Picks</h2></div>
                        <div className="songs-grid">
                            {songs.slice(0, 4).map(song => (
                                <div key={song._id} className="song-card" onClick={() => handlePlay(song)}>
                                    <div className="card-image-wrapper">
                                        <img src={song.poster} alt="" />
                                    </div>
                                    <div className="card-info">
                                        <div className="card-title">{song.title}</div>
                                        <div className="card-artist">{song.artist}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Home;