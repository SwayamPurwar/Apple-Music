import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playlists: [],
    selectedPlaylist: null,
};

export const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        addPlaylist: (state, action) => {
            state.playlists.push(action.payload);
        },
        setSelectedPlaylist: (state, action) => {
            state.selectedPlaylist = action.payload;
        }
    },
});

export const { setPlaylists, addPlaylist, setSelectedPlaylist } = playlistSlice.actions;

export const selectPlaylists = (state) => state.playlists.playlists;
export const selectSelectedPlaylist = (state) => state.playlists.selectedPlaylist;

export default playlistSlice.reducer;