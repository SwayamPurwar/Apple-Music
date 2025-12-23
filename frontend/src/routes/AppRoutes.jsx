import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Upload from '../pages/Upload'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Songs from '../pages/Songs'
import Albums from '../pages/Albums'
import Playlists from '../pages/Playlists'
import PlaylistDetails from '../pages/PlaylistDetails'
import LikedSongs from '../pages/LikedSongs'
import Radio from '../pages/Radio'
import ArtistDetails from '../pages/ArtistDetails'
import Profile from '../pages/Profile'
import Library from '../pages/Library'
import Artists from '../pages/Artists'
import AlbumDetails from '../pages/AlbumDetails'
import PublicProfile from '../pages/PublicProfile';
import Downloaded from '../pages/Downloaded' 
import Protected from '../components/Protected'
import MainLayout from '../components/MainLayout'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route element={<Protected><MainLayout /></Protected>}>
                    <Route path="/" element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path="/upload" element={<Upload />} />
                    
                    {/* Library Routes */}
                    <Route path="/library" element={<Library />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/songs" element={<Songs />} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/album/:id" element={<AlbumDetails />} />
                    
                    {/* 2. ADD THE DOWNLOADED ROUTE HERE */}
                    <Route path="/downloaded" element={<Downloaded />} />
                    <Route path="/user/:id" element={<PublicProfile />} />

                    <Route path="/playlist/:id" element={<PlaylistDetails />} />
                    <Route path="/liked-songs" element={<LikedSongs />} />
                    <Route path="/radio" element={<Radio />} />
                    <Route path="/artist/:name" element={<ArtistDetails />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes