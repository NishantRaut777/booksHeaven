import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: process.env.NODE_ENV === 'development'
//         ? `${process.env.REACT_APP_BACKEND_URL}`
//         : 'devurl',
//     withCredentials: true,
// });

const axiosInstance = axios.create({
    baseURL: 'https://booksheaven.onrender.com',
    withCredentials: true,
});

export default axiosInstance;