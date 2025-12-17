import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/songSlice';
import playlistReducer from './features/playlistSlice';

export const store = configureStore({
  reducer: {
    songs: songReducer,
    playlists: playlistReducer,
  },
});

export default store;
