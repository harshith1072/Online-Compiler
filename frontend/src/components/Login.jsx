import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api';

import "../styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginSuccess = () => toast.success('Successfully logged in');
    const handleLoginError = () => toast.error('Invalid credentials, please try again.');
    const redirectToHomepage = () => navigate('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/login', { email, password });

            if (response.status === 200) {
                // Assuming your backend sends the token in response.data.token
                const token = response.data.token; 
                localStorage.setItem('token', token); // Store the token in local storage
                
                navigate('/problems');
                handleLoginSuccess();
            } else {
                handleLoginError();
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                handleLoginError();
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="back-button-wrapper">
                    <button onClick={redirectToHomepage} className="back-button" title="Go Back">
                        <FiArrowLeft size={24} />
                    </button>
                </div>
                <div className="login-header">
                    <h2 className="login-title">Login to Your Account</h2>
                    <p className="login-subtitle">Welcome back! Please enter your details.</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="register-link-text">
                    Don't have an account? <NavLink to="/signup" className="register-link">Register here.</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;