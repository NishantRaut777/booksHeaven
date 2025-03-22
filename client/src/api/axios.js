import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_BACKEND_URL}`
        : 'devurl',
    withCredentials: true,
});

export default axiosInstance;