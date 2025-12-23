const STORAGE_KEY = 'apple_music_downloads';

export const getDownloadedSongs = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const isSongDownloaded = (songId) => {
    const songs = getDownloadedSongs();
    return songs.some(s => s._id === songId);
};

export const toggleDownload = (song) => {
    const songs = getDownloadedSongs();
    const exists = songs.some(s => s._id === song._id);
    
    let newSongs;
    if (exists) {
        newSongs = songs.filter(s => s._id !== song._id);
    } else {
        newSongs = [...songs, song];
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSongs));
    return !exists; // Returns true if added, false if removed
};