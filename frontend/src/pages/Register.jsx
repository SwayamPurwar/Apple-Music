import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css' // Uses your existing Login styles
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate();
    
    // 1. State for form fields (Replaces document.querySelector)
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleRegister(event){
        event.preventDefault();
        
        // 2. Send 'email', 'username', and 'password' to the backend
      axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            email, 
            username, 
            password 
        }, { withCredentials: true })
        .then(() => {
            // Success: redirect to login or home
            navigate("/");
        })
        .catch(err => {
            // 3. Handle errors (e.g., Username/Email already taken)
            console.error("Registration Error:", err);
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
        });
    }
    
    return (
        <section className="auth-section">
            <div className="auth-card">
                <div className="auth-header">
                    <svg viewBox="0 0 384 512" width="40" height="40" fill="white" className="auth-logo" style={{marginBottom: '15px'}}>
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                    </svg>
                    <h1>Apple Music</h1>
                </div>

                <div className="auth-body">
                    <h2>Create your account</h2>
                    <p className="auth-subtitle">Get access to millions of songs and your entire music library.</p>

                    {/* Display Error Message */}
                    {error && <p style={{color: '#ff4d4d', marginBottom: '15px', fontSize: '14px'}}>{error}</p>}

                    <form onSubmit={handleRegister} className="auth-form">
                        {/* NEW: Email Input */}
                        <div className="input-group">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="auth-button">Create Account</button>
                    </form>
                </div>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Register