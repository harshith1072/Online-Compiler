import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                 
                const response = await axios.get("http://localhost:9000/check-auth", {
                    withCredentials: true,
                });
                
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    if (isLoading) {
        // You can render a loading spinner or message here
        return <div>Loading...</div>;
    }

    // If the user is authenticated, render the children (the protected page)
    if (isAuthenticated) {
        return children;
    }

    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
};

export default ProtectedRoute;