import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:9000',
    //   baseURL: 'https://codejudge-lfe8.onrender.com',
    withCredentials: true, // ✅ This is what sends the cookie
});

api.interceptors.request.use(
    config => {
        const token = Cookies.get('Authorization'); // ✅ Get the token from a cookie
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // ✅ Set the Authorization header
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;