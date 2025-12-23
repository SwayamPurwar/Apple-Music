import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectCurrentSong, 
    selectIsPlaying, 
    togglePlayPause,
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat,
    selectIsShuffle,
    selectIsRepeat 
} from '../redux/features/songSlice';
import './NowPlaying.css';

const NowPlaying = () => {
    const dispatch = useDispatch();
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const isShuffle = useSelector(selectIsShuffle);
    const isRepeat = useSelector(selectIsRepeat);
    
    // Audio Reference & Local State
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    // 1. Play/Pause Effect
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback error:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]);

    // 2. Volume Effect
    useEffect(() => {
        if(audioRef.current){
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // 3. Audio Handlers
    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            if(isPlaying) audioRef.current.play();
        }
    };

    const handleSongEnd = () => {
        if (isRepeat) {
            if(audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            dispatch(playNextSong());
        }
    };

    const handleSeek = (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = e.nativeEvent.offsetX;
        const width = progressBar.clientWidth;
        const newTime = (clickPosition / width) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    if (!currentSong) return null;

    return (
        <div className="now-playing-container">
            <audio 
                ref={audioRef}
                src={currentSong.audio} 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd} 
            />

            <div className="now-playing-pill">
                {/* LEFT: Info */}
                <div className="np-left">
                    <img src={currentSong.poster} alt="" className="np-cover" />
                    <div className="np-info">
                        <div className="np-title">{currentSong.title}</div>
                        <div className="np-artist">{currentSong.artist}</div>
                    </div>
                </div>

                {/* CENTER: Controls */}
                <div className="np-center">
                    <div className="np-controls">
                        {/* 1. Shuffle */}
                        <button className={`icon-btn ${isShuffle ? 'active-control' : ''}`} onClick={() => dispatch(toggleShuffle())}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                        </button>

                        {/* 2. Previous */}
                        <button className="icon-btn" onClick={() => dispatch(playPreviousSong())}>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                        </button>
                        
                        {/* 3. Play/Pause (Main) */}
                        <button className="play-pause-btn" onClick={() => dispatch(togglePlayPause())}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            )}
                        </button>

                        {/* 4. Next */}
                        <button className="icon-btn" onClick={() => dispatch(playNextSong())}>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                        </button>

                        {/* 5. Repeat */}
                        <button className={`icon-btn ${isRepeat ? 'active-control' : ''}`} onClick={() => dispatch(toggleRepeat())}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                        </button>
                    </div>

                    <div className="np-progress">
                        <span className="time">{formatTime(currentTime)}</span>
                        <div className="progress-bar-wrapper" onClick={handleSeek}>
                            <div className="progress-bg">
                                <div className="progress-fill" style={{width: `${progressPercent}%`}}></div>
                            </div>
                        </div>
                        <span className="time">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* RIGHT: Volume */}
                <div className="np-right">
                    <button className="icon-btn" onClick={() => setVolume(volume === 0 ? 1 : 0)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                    </button>
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="volume-slider" />
                </div>
            </div>
        </div>
    );
}

export default NowPlaying;