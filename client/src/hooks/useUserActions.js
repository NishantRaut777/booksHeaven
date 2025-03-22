import { useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../api/axios'
import { setUser } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const useUserActions = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const updateUser = async(data) => {
        const response = await axiosInstance.put(`/api/user/updateProfile`, data, { withCredentials: true });
        queryClient.invalidateQueries(["user"]);
        dispatch(setUser(response.data.user))
        return response.data;
    }

    return { updateUser };
}

export default useUserActions
