import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: process.env.NODE_ENV === 'development'
//         ? `${process.env.REACT_APP_BACKEND_URL}`
//         : 'devurl',
//     withCredentials: true,
// });

const axiosInstance = axios.create({
    // baseURL: 'https://booksheaven.onrender.com',
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: false,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;