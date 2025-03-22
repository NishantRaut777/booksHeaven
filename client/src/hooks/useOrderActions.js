import axiosInstance from "../api/axios";

const useOrderActions = () => {

    const checkoutOrder = async(Name, address, phoneNumber) => {
        const response = await axiosInstance.post("/api/order/checkoutOrder", {Name, address, phoneNumber}, { withCredentials: true });
        return response.data;
    }

    const fetchOrders = async() => {
        const response = await axiosInstance.get(`/api/order/getOrders`);
        return response.data.orders
    } 

    return { checkoutOrder, fetchOrders };
}

export default useOrderActions;