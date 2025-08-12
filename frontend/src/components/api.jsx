 

 import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:9000',
      baseURL: 'https://codejudge-lfe8.onrender.com',
    withCredentials: true, // ✅ This is what sends the cookie
});

export default api;