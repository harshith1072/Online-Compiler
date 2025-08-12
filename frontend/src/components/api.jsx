// api.js

import axios from 'axios';

// Create an Axios instance with the correct base URL for your deployed backend.
const api = axios.create({
  baseURL: 'https://codejudge-lfe8.onrender.com',
  // withCredentials is not needed for a token-based approach.
});

// Use a request interceptor to automatically add the authorization header to every request.
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage.
    const token = localStorage.getItem('token');
    
    // If a token exists, add it to the request headers.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config.
    return config;
  },
  (error) => {
    // Handle request errors.
    return Promise.reject(error);
  }
);

export default api;
