import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { message } from "antd";
import { setUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    // const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async(values) => {
                    const res = await axiosInstance.post("/api/user/login", values);
                    return res.data;
                },
        onSuccess: (data) => {
            if(data.success) {
                localStorage.setItem("jwtToken", data.token);
                // setUser(data);
                message.success("Login Successfully");
                // queryClient.invalidateQueries(["user"]);
                dispatch(setUser(data));
                navigate("/");
            }else {
                message.error(data.message);
            }
        },

        onError: (error) => {
            message.error(error.response?.data?.message || "Something went wrong!");
        }
    })
}

export default useLogin;