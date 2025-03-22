import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useCart } from "../context/CartContext";

const fetchCart = async () => {
    const response = await axiosInstance.get("/api/cart/my-cart", { withCredentials: true });
    console.log("CART DATA", response.data);
    return response.data;
}

const useFetchCart = () => {
    // console.log("USEFETCH CALLED");
    // const {  setCart } = useCart();

    const {  data: cart, isLoading, isError } = useQuery({
        queryKey: ["cart"],
        queryFn: fetchCart,
        staleTime: 5 * 60 * 1000,
        onSuccess: (data) => {
            console.log("ONSUCCES DATA", data);
        },
        onError: () => {
            console.log("EROROR");
        }
    });

    return { cart, isLoading, isError };
};

export default useFetchCart;