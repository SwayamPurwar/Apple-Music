import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import './Artists.css';

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/songs/get-artists", { withCredentials: true })
            .then(res => setArtists(res.data.artists))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="artists-section">
            <MobileHeader title="Artists" />
            
            <div className="artists-header">
                <h1>Artists</h1>
                <p>{artists.length} Artists</p>
            </div>

            <div className="artists-grid">
                {artists.map((artist) => (
                    <div 
                        key={artist._id} 
                        className="artist-card" 
                        onClick={() => navigate(`/artist/${encodeURIComponent(artist._id)}`)}
                    >
                        <div className="artist-image-wrapper">
                            <img src={artist.poster} alt={artist._id} />
                        </div>
                        <div className="artist-name">{artist._id}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Artists;