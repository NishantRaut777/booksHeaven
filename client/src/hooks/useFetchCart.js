import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useCart } from "../context/CartContext";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cart/cartSlice";
import { useEffect } from "react";

const fetchCart = async () => {
    const response = await axiosInstance.get("/api/cart/my-cart", { withCredentials: true });
    // console.log("CART DATA", response.data);
    return response.data;
}

const useFetchCart = () => {
    // console.log("USEFETCH CALLED");
    // const {  setCart } = useCart();

    const dispatch = useDispatch();

    const {  data: cart, isLoading, isError } = useQuery({
        queryKey: ["cart"],
        queryFn: fetchCart,
        staleTime: 5 * 60 * 1000,
        
    });

    useEffect(() => {
        if(cart){
            dispatch(setCart(cart));
        }
    },[cart, dispatch]);

    return { cart, isLoading, isError };
};

export default useFetchCart;