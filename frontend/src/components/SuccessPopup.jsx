import React, { useEffect } from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ message, onClose }) => {
    useEffect(() => {
        // Automatically close after 3 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="success-popup-container">
            <div className="success-popup">
                <div className="popup-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span className="popup-message">{message}</span>
            </div>
        </div>
    );
};

export default SuccessPopup;