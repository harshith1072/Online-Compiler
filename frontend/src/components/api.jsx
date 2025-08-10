 

import axios from 'axios'

const instance = axios.create({
    baseURL : "http://localhost:9000",
     
    withcredentials : true,
});

export default instance;

 