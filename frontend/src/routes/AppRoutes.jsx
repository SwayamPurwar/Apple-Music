import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// ... imports
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
import Library from '../pages/Library' // <--- IMPORT
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
                    <Route path="/library" element={<Library />} /> {/* NEW */}
                    <Route path="/playlists" element={<Playlists />} />
                    
                    <Route path="/songs" element={<Songs />} />
                    <Route path="/albums" element={<Albums />} />
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