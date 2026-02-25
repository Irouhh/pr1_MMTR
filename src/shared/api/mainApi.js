import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:7000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(function(config) {

    const token = localStorage.getItem('token');
    
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    
    return config;
});