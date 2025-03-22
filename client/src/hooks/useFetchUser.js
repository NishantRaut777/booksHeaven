import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import axiosInstance from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { useSelector } from 'react-redux';


const fetchCurrentUser = async() => {
    const response = await axiosInstance.get("/api/user/me", { withCredentials: true });
    return response.data.user;
};

const useFetchUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);


    const { data, isLoading, isSuccess, isError, error, status }  = useQuery({
    queryKey: ["user"], 
    queryFn: ()=> fetchCurrentUser(),
    staleTime:  1000 * 60 * 1,
  });

  if(data && !user){
    dispatch(setUser(data));
  }

  return { user: user || data, isLoading };
};

export default useFetchUser;