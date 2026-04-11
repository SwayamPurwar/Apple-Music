import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

const Login = () => {
    const navigate = useNavigate();

    // 1. CHANGED: Using 'email' instead of 'username'
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // 2. CHANGED: Sending the correct data to backend
            const response = await axios.post(
                "http://localhost:3000/auth/login", 
                { 
                    email: email, // <--- Backend expects "email"
                    password: password 
                }, 
                { withCredentials: true }
            );

            console.log("Login Success:", response.data);
            navigate("/");

        } catch (err) {
            console.error("Login Error:", err);
            const serverMsg = err.response?.data?.message || err.response?.data?.error;
            setError(serverMsg || "Login failed. Please check your details.");
        }
    }

    return (
        <section className="auth-section">
            <div className="auth-card">
                <div className="auth-header">
                    <svg viewBox="0 0 384 512" width="48" height="48" fill="white" className="auth-logo">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                    </svg>
                    <h1>Sign In</h1>
                </div>

                <div className="auth-body">
                    <p className="auth-subtitle">Enter your email and password to access your music.</p>

                    {error && (
                        <div style={{
                            backgroundColor: 'rgba(250, 45, 72, 0.1)', 
                            color: '#fa2d48', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            marginBottom: '15px',
                            fontSize: '14px',
                            textAlign: 'center',
                            border: '1px solid rgba(250, 45, 72, 0.2)'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="input-container">
                            {/* 3. CHANGED: Input is now type='email' */}
                            <input 
                                type="email" 
                                placeholder='Email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="input-container">
                            <input 
                                type="password" 
                                placeholder='Password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <button type="submit" className="auth-button">
                            Sign In
                        </button>
                    </form>
                </div>

                <div className="auth-footer">
                    <a href="#" className="forgot-password">Forgot password?</a>
                    <div className="divider"></div>
                    <p>Don't have an account? <Link to="/register" className="create-account-link">Create one</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login