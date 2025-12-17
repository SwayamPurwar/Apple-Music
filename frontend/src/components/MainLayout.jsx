import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import NowPlaying from './NowPlaying';
import BottomNavigation from './BottomNavigation'; // Import new component
import { useSelector } from 'react-redux';
import { selectCurrentSong } from '../redux/features/songSlice';
import './MainLayout.css';

const MainLayout = () => {
    const currentSong = useSelector(selectCurrentSong);

    return (
        <div className="main-layout">
            
            {/* Desktop Sidebar (Hidden on mobile via CSS) */}
            <Navigation />

            {/* Main Content Area */}
            <main className={`main-content ${currentSong ? 'has-player' : ''}`}>
                <Outlet />
            </main>

            {/* Floating Player */}
            {currentSong && <NowPlaying />}

            {/* Mobile Bottom Tab Bar */}
            <BottomNavigation />
        </div>
    );
};

export default MainLayout;