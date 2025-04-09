import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../axios';

const SessionChecker = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const refreshUser = async () => {
        try {
          const response = await axiosInstance.get("/api/user/refresh-token");
          if (!response?.data?.success) {
            console.log("User session expired");
            if (location.pathname !== "/login") navigate("/login");
          }
        } catch (error) {
          console.log("User session expired");
          if (location.pathname !== "/login") navigate("/login");
        }
      };
  
      refreshUser();
    }, [navigate, location]);
  
    return null;
}

export default SessionChecker
