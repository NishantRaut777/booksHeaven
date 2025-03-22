import React from 'react'
import useFetchUser from '../hooks/useFetchUser'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  // console.log("PROTECTEDROUTE", user);
  
  if(!user) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
