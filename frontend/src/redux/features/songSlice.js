import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [], // Global library
  queue: [], // The active list being played
  currentSong: null,
  isPlaying: false,
  filteredSongs: [],
  isShuffle: false,
  isRepeat: false,
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    
    // Standard Play (Fallback if no queue exists)
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      // If queue is empty, default to playing from All Songs
      if (state.queue.length === 0) {
          state.queue = state.songs;
      }
      state.isPlaying = true;
    },

    // NEW: Play a song and define its context (the queue)
    playFromContext: (state, action) => {
        const { song, list } = action.payload;
        state.currentSong = song;
        state.queue = list;
        state.isPlaying = true;
    },

    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    setIsPlaying: (state, action) => {
        state.isPlaying = action.payload;
    },

    // Updated Player Logic to use QUEUE instead of SONGS
    playNextSong: (state) => {
        if (!state.currentSong || state.queue.length === 0) return;

        const currentIndex = state.queue.findIndex(s => s._id === state.currentSong._id);
        
        if (state.isShuffle) {
            const randomIndex = Math.floor(Math.random() * state.queue.length);
            state.currentSong = state.queue[randomIndex];
        } else {
            // Loop back to start
            const nextIndex = (currentIndex + 1) % state.queue.length;
            state.currentSong = state.queue[nextIndex];
        }
        state.isPlaying = true;
    },

    playPreviousSong: (state) => {
        if (!state.currentSong || state.queue.length === 0) return;

        const currentIndex = state.queue.findIndex(s => s._id === state.currentSong._id);
        // Loop to end
        const prevIndex = (currentIndex - 1 + state.queue.length) % state.queue.length;
        
        state.currentSong = state.queue[prevIndex];
        state.isPlaying = true;
    },

    searchSongs: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query.trim() === '') {
        state.filteredSongs = [];
      } else {
        state.filteredSongs = state.songs.filter(
          song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
      }
    },
    setFilteredSongs: (state, action) => {
      state.filteredSongs = action.payload;
    },
    toggleShuffle: (state) => {
        state.isShuffle = !state.isShuffle;
    },
    toggleRepeat: (state) => {
        state.isRepeat = !state.isRepeat;
    }
  },
});

export const { 
    setSongs, 
    setCurrentSong, 
    playFromContext, // Export new action
    togglePlayPause, 
    setIsPlaying, 
    searchSongs, 
    setFilteredSongs,
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat 
} = songSlice.actions;

export const selectSongs = (state) => state.songs.songs;
export const selectCurrentSong = (state) => state.songs.currentSong;
export const selectIsPlaying = (state) => state.songs.isPlaying;
export const selectFilteredSongs = (state) => state.songs.filteredSongs;
export const selectIsShuffle = (state) => state.songs.isShuffle;
export const selectIsRepeat = (state) => state.songs.isRepeat;

export default songSlice.reducer;