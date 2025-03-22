import axiosInstance from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { setCart } from '../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';

const useCartActions = () => {
     const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const addToCart = async(item) => {
        const response = await axiosInstance.post("/api/cart/addToCart", item, { withCredentials: true });
        queryClient.invalidateQueries(["cart"]);
        dispatch(setCart(response.data.cart))
        return response.data;
    };

    const updateCartItem = async(bookId, type) => {
        const response = await axiosInstance.put(`/api/cart/addCartItemIncrDecr`, { bookId, type }, { withCredentials: true });
        // queryClient.invalidateQueries(["cart"]);
        return response.data;
    };

    const deleteCartItem = async(bookId) => {
        console.log("INSIDE DELETE CART ITEM", bookId);
        const response = await axiosInstance.delete(`/api/cart/deleteCartItem`, { params: {bookId },  withCredentials: true });
        return response.data;
    }

    const clearCart = async () => {
        const response = await axiosInstance.delete("/api/cart/my-cart", { withCredentials: true });
        queryClient.invalidateQueries(["cart"]);
        return response.data;
    };

    return { addToCart, updateCartItem, deleteCartItem, clearCart };
}

export default useCartActions;