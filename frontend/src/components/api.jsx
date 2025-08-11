 

// import axios from 'axios'

// const instance = axios.create({
//     baseURL : "http://localhost:9000",
     
//     withcredentials : true,
// });

// export default instance;

 import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: true, // ✅ This is what sends the cookie
});

export default api;