import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import './Albums.css';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/albums/all`, { withCredentials: true })
        .then(response => {
            setAlbums(response.data.albums);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <section className="albums-section">
            <MobileHeader title="Albums" />
            <div className="albums-header">
                <h1>Albums</h1>
                <p>Your Collection</p>
            </div>

            <div className="albums-grid">
                {albums.length > 0 ? albums.map(album => (
                    <div key={album._id} className="album-card" onClick={() => navigate(`/album/${album._id}`)}>
                        <div className="album-image-container">
                            <img src={album.bgImage} alt={album.title} loading="lazy" />
                        </div>
                        <div className="album-info">
                            <div className="album-title">{album.title}</div>
                            <div className="album-artist">{album.artist}</div>
                        </div>
                    </div>
                )) : (
                    <p style={{color: '#aaa'}}>No albums found.</p>
                )}
            </div>
        </section>
    );
};

export default Albums;