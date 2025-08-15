


import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import config from "./config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";
import "../Styles/Signup.css";

const SERVER_URL = config.SERVER_URL;

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [rollno, setRollNo] = useState("");
    const [email, setEmail] =   useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        const data = {
            username: name,
            rollno: rollno,
            email: email,
            password: password,
        };

        try {
            const res = await axios.post(`${SERVER_URL}/signup`, data);
            if (res.status === 201) {
                toast.success("Successfully registered! Please log in.");
                navigate("/login");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Email already exists. Please use a different email.");
            } else {
                toast.error("An error occurred during signup. Please try again.");
                console.error("Signup error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="back-button-wrapper">
                    <button onClick={() => navigate("/")} className="back-button" title="Go Back">
                        <FiArrowLeft size={24} />
                    </button>
                </div>
                <div className="signup-header">
                    <h2 className="signup-title">Create an Account</h2>
                    <p className="signup-subtitle">Join us to start your coding journey.</p>
                </div>
                <form className="signup-form" onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Roll No</label>
                        <input
                            type="text"
                            value={rollno}
                            onChange={(e) => setRollNo(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? <Spinner /> : "Sign Up"}
                    </button>
                </form>
                <p className="login-link-text">
                    Already have an account? <NavLink to="/login" className="login-link">Log in here.</NavLink>
                </p>
            </div>
        </div>
    );
}

export default Signup;