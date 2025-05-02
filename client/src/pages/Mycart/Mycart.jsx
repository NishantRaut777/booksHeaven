import React from 'react'
import useFetchCart from "../../hooks/useFetchCart";
import useCartActions from '../../hooks/useCartActions';
import { setCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from "lucide-react";
import Navbar2 from '../../components/Navbar2';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Mycart = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // this function makes update api call
    const { updateCartItem, deleteCartItem } = useCartActions();

    const navigate = useNavigate();

    // gets user's  cart
    const { cart , isLoading } = useFetchCart();
    const cartNew = useSelector((state) => state.cart.cartData);
   
    const updateCartMutation = useMutation({
      mutationFn:({ bookId, type }) => updateCartItem(bookId, type),
      onSuccess: (data) => {
        dispatch(setCart(data));
        queryClient.invalidateQueries(['cart']);
      },
      onError: (error) => {
        console.error(error);
      }
    });

    const deleteCartMutation = useMutation({
      mutationFn: ({  bookId }) => deleteCartItem(bookId),
      onSuccess: (data) => {
        dispatch(setCart(data));
        queryClient.invalidateQueries(["cart"]);
      },
      onError: (error) => {
        console.error(error);
      }
    })

    const handleIncrementCartProduct = (bookId) => {
      updateCartMutation.mutate({ bookId, type: "INCR" });
    };

    const handleDecrementCartProduct = (bookId, quantity) => {
      if(quantity > 1){
        updateCartMutation.mutate({ bookId, type: "DECR" });
      }
    };

    const handleRemoveCartItem = (bookId) => {
      deleteCartMutation.mutate({ bookId });
    }

    // if(cart){
    //   console.log("INSIDE MY CART", cart);
    //   dispatch(setCart(cart));
    // }

    if (isLoading) return <div>Loading...</div>


  return (
    <>
      <Navbar2 />
      <div className='py-5 px-2'>
        <h1 className="ml-2 text-lg font-semibold">My Cart</h1>
        <div className="my-cart-books-div flex flex-col pb-4">
            {cart?.items?.map((item) => (
              <div key={item.bookId} className="flex p-2 hover:bg-gray-100 transition duration-200 rounded-md">
                <div className='flex flex-row basis-[80vw]'>
                <div className="book-img mr-2 pt-1 flex-shrink-0">
                  <img className="size-20 rounded-md" src={item.imgurl} alt={item.name} />
                </div>

                <div className="book-desc pl-1">
                  <h2 className="break-words whitespace-normal line-clamp-2 text-base font-medium">{item.name}</h2>
                  <div className="my-cart-price-container text-sm">
                    <span className="line-through mr-2 text-gray-500">Rs. {item.originalPrice}</span>
                    <span className="font-semibold text-black">Rs. {item.price}</span>
                  </div>

                  <div className="my-cart-quantity-container flex items-center mt-1">
                  <span
                      className="cursor-pointer mr-2 px-2 py-1 bg-gray-300 rounded hover:bg-red-300 transition"
                      onClick={() => handleDecrementCartProduct(item.bookId, item.quantity)}
                    >
                      -
                    </span>
                    <p className="text-lg font-semibold">{item.quantity}</p>
                    <span
                      className="cursor-pointer ml-2 px-2 py-1 bg-gray-300 rounded hover:bg-green-300 transition"
                      onClick={() => handleIncrementCartProduct(item.bookId)}
                    >
                      +
                    </span>
                  </div>
                </div>
                </div>
                

                <div className="my-cart-delete-icon flex justify-center basis-[10vw]">
                  <Trash
                    size={22}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
                    onClick={() => handleRemoveCartItem(item.bookId)}
                  />
                </div>
              </div>
            ))}
        </div>

        { cartNew?.items?.length > 0 ?  <p className="ml-2 py-2 text-md font-semibold">Total Bill: {cartNew?.bill}</p>: ""}

        {cartNew?.items?.length > 0 ? (
          <div className="border-t border-indigo-600 p-4 bg-white">
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-medium hover:bg-indigo-700 transition duration-300" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-sm m-2">Your cart is empty</p>
        )}
      </div>
    </>
  )
}

export default Mycart
