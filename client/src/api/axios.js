import axios from 'axios';
import store  from "../redux/store"; // Import Redux store
import { setUser } from "../redux/user/userSlice"; 

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

// Interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        if (error.response?.status === 401) {
            try {
                // Try refreshing the token
                await axiosInstance.get("/api/user/refresh-token");

                // Retry the original request
                return axiosInstance(error.config);
            } catch (refreshError) {
                console.log("Refresh Token Expired: Logging out user");
                // clearing user from redux
                store.dispatch(setUser(null)); 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;