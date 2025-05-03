import React, { useEffect, useState } from "react";
import useFetchCart from "../../hooks/useFetchCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCartActions from "../../hooks/useCartActions";
import { useDispatch } from "react-redux";
import { clearCart, setCart } from "../../redux/cart/cartSlice";
import { Trash } from "lucide-react";
import axiosInstance from "../../api/axios";
import useOrderActions from "../../hooks/useOrderActions";
import Navbar2 from "../../components/Navbar2";
import { useSelector } from "react-redux";
import { message } from 'antd';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const { cart } = useFetchCart();
  const cartNew = useSelector((state) => state.cart.cartData);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { updateCartItem, deleteCartItem } = useCartActions();

  const { checkoutOrder } = useOrderActions();

  const updateCartMutation = useMutation({
    mutationFn: ({ bookId, type }) => updateCartItem(bookId, type),
    onSuccess: (data) => {
      if(data.message){
        message.success(data.message);
      }
      dispatch(setCart(data));
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteCartMutation = useMutation({
    mutationFn: ({ bookId }) => deleteCartItem(bookId),
    onSuccess: (data) => {
      if(data.message){
        message.success(data.message);
      }
      dispatch(setCart(data));
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleIncrementCartProduct = (bookId) => {
    updateCartMutation.mutate({ bookId, type: "INCR" });
  };

  const handleDecrementCartProduct = (bookId, quantity) => {
    if (quantity > 1) {
      updateCartMutation.mutate({ bookId, type: "DECR" });
    }
  };

  const handleRemoveCartItem = (bookId) => {
    deleteCartMutation.mutate({ bookId });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      return await checkoutOrder(
        formData.name,
        formData.address,
        formData.phoneNumber
      );
    },
    onSuccess: (data) => {
      dispatch(clearCart());
      if (data.message){
        message.success(data.message)
      }
      queryClient.invalidateQueries(["cart"]);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    checkoutMutation.mutate();
  };

  return (
    <>
      <Navbar2 />
      <div className="flex flex-col md:flex-row gap-6 py-6 px-3 bg-gray-50">
        <div
          className={`${
            cartNew?.items?.length > 2 ? "h-[70vh]" : "h-[auto]"
          } md:w-[50%]`}
        >
          <h1 className="ml-4 text-xl font-semibold">Order Summary</h1>
          {cartNew?.items?.length === 0 ? (
            <p className="ml-4 py-2 text-lg font-bold">No items in cart</p>
          ) : (
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-50px)] custom-scrollbar">
              {cart?.items?.map((item) => (
                <div key={item.bookId} className="flex p-2 border-b">
                  <img
                    className="w-20 h-28 object-cover"
                    src={item.imgurl}
                    alt={item.name}
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="font-semibold text-base">{item.name}</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 line-through text-sm">
                        Rs. {item.originalPrice}
                      </span>
                      <span className="text-black font-semibold text-lg">
                        Rs. {item.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-3">
                    <button
                        className="px-3 py-1  bg-gray-300 rounded text-lg hover:bg-red-300 transition"
                        onClick={() =>
                          handleDecrementCartProduct(item.bookId, item.quantity)
                        }
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">
                        {item.quantity}
                      </span>
                      

                      <button
                        className="px-3 py-1 bg-gray-300 rounded text-lg hover:bg-green-300 transition"
                        onClick={() => handleIncrementCartProduct(item.bookId)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveCartItem(item.bookId)}>
                    <Trash
                      size={20}
                      className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          { cartNew?.items?.length > 0 ?  <p className="ml-4 py-2 text-md font-semibold">Total Bill: {cartNew?.bill}</p>: ""}
        </div>

        <div className="md:w-[50%]">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition"
                  required
                />
              </div>
              <div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Your Address"
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition"
                  required
                ></textarea>
              </div>
              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  placeholder="Enter Your Phone Number"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-32 py-2 text-lg font-semibold transition-all rounded-lg 
${
  cartNew?.items?.length === 0 || checkoutMutation.isLoading
    ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled state
    : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md active:scale-95"
}`} // Enabled state
                disabled={
                  cartNew?.items?.length === 0 || checkoutMutation.isLoading
                }
              >
                {checkoutMutation.isLoading ? "Processing..." : "Checkout"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
