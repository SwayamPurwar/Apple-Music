import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Upload.css'
import axios from 'axios'

const Upload = () => {
    const [ title, setTitle ] = useState('')
    const [ artist, setArtist ] = useState('')
    const [ fileName, setFileName ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        if(e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('chacha', document.querySelector('#_audioFile').files[0]);

      axios.post(`${import.meta.env.VITE_API_URL}/songs/upload`, formData, {
            withCredentials: true
        }).then(() => {
            setIsLoading(false);
            navigate('/');
        }).catch(() => {
            setIsLoading(false);
            // Handle error here
        });
    }

    return (
        <section className="upload-section">
            <div className="upload-container">
                <div className="upload-header">
                    <h1>Upload Music</h1>
                    <p>Add your own songs to your personal library.</p>
                </div>

                <form className="upload-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Song Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="text-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Artist</label>
                        <input
                            type="text"
                            placeholder="Artist Name"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            required
                            className="text-input"
                        />
                    </div>

                    <div className="file-upload-group">
                        <label className={`upload-dropzone ${fileName ? 'active' : ''}`}>
                            <div className="dropzone-content">
                                {fileName ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="48" height="48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="music-icon"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                                        <span className="filename">{fileName}</span>
                                        <span className="change-text">Click to change file</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="upload-icon-circle">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                        </div>
                                        <span className="upload-title">Select Audio File</span>
                                        <span className="upload-subtitle">MP3, WAV, or OGG support</span>
                                    </>
                                )}
                            </div>
                            <input
                                id='_audioFile'
                                type="file"
                                accept="audio/*"
                                onChange={handleFileChange}
                                required
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                    
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Add to Library'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Upload