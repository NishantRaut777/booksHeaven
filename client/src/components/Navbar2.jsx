import React, { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCartActions from "../hooks/useCartActions";
import useFetchCart from "../hooks/useFetchCart";
import { Trash } from "lucide-react";
import { setCart } from "../redux/cart/cartSlice";
import "../styles/Navbar2.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { clearUser } from "../redux/user/userSlice";


const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
 
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromURL = urlParams.get("searchTerm") || "";

  const [searchValue, setSearchValue] = useState(searchTermFromURL);

  // to keep latest search value in search input
  useEffect(() => {
    setSearchValue(searchTermFromURL);
  }, [searchTermFromURL]);

  const navigate = useNavigate();

  const cartNew = useSelector((state) => state.cart.cartData);
  const cartCount = cartNew?.items?.length;

  const loggedInUser = useSelector((state) => state.user.user);
  // console.log("LOGGED IN USER: ", loggedInUser);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { updateCartItem, deleteCartItem } = useCartActions();
  const { cart } = useFetchCart();

  // deciding ismobile or not
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

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

  const handleCartClick = () => {
    if(isMobile){
      navigate("/mycart");
    } else {
      setIsCartOpen(!isCartOpen);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchValue);

    const searchQuery = urlParams.toString();
    const searchTerm = urlParams.get("searchTerm");

    // If search term is empty navigate to homepage
    if (searchTerm === "") {
      navigate("/");
    } else {
      navigate(`/booksSearch?${searchQuery}`);
    }
  };

  const handleLogout = async() => {
    localStorage.removeItem("jwtToken");
    dispatch(clearUser());
  }

  return (
    <nav className="my-navbar relative bg-[#333333] text-white">
    <div className="flex w-[100vw] items-center justify-between p-2 md:p-4">
      <div className="flex flex-col items-center w-full md:hidden">
        <div className="flex items-center w-full">
          <Hamburger className="w-[10%]" toggled={isOpen} size={20} toggle={setIsOpen} />

          <div className="w-[80%] text-center text-lg font-bold">
            <Link to={"/"} className="no-underline text-black-200">
              Logo
            </Link>
          </div>

          <div className="relative w-[10%]">
            <button onClick={handleCartClick} className="no-underline text-black-200">
              <FontAwesomeIcon icon={faCartShopping} />
              {cartCount > 0 && (
                <span className="absolute left-3 -top-3 bg-white text-blue-500 w-4 rounded-full">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="w-[70%] py-5">
        <form action="" onSubmit={handleSubmit} className="flex flex-row">
              <input
              type="text"
              placeholder="Search Books, Authors & More ..."
              className="w-full p-3 text-gray-800 bg-white border border-gray-300 caret-blue-500 rounded-sm"
                onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              />
              <button className="btn btn-outline-success p-2 bg-orange-300 hover:bg-orange-500" type="submit">
                Search
              </button>
            </form>
        </div>
        
      </div>

      <div className="hidden w-full md:flex items-center justify-between">
        <div className="text-lg font-bold mx-14">
          <Link to={"/"} className="no-underline text-black-200">
            Logo
          </Link>
        </div>
        <div className="flex w-[60%] justify-center">
          <form className="w-[70%] flex justify-center relative" onSubmit={handleSubmit}>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              className="w-[100%] p-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />

            {/* Search Icon (Acts as Button) */}
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-all"
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
          </form>
        </div>


        <div className="flex items-center justify-center space-x-5">
          <Link to={"/myprofile"} className="no-underline text-black-200">
            Myprofile
          </Link>

          <div className="relative">
            <button onClick={handleCartClick} className="no-underline text-black-200">
              <FontAwesomeIcon icon={faCartShopping} />
              {cartCount > 0 && (
                <span className="absolute -right-3 -top-3 bg-white text-blue-500 px-1 rounded-full">{cartCount}</span>
              )}
            </button>
          </div>

          { 
            loggedInUser ? (
              <Link className="hover:text-gray-400" onClick={() => handleLogout()}>Logout</Link>
            ) : (
              <div className="login-register-btn">
              <Link to={"/login"} className="no-underline px-4 py-3">
            Login
          </Link>

          <Link to={"/register"} className="no-underline px-4 py-3">
            Register
          </Link>
          </div>
            )
          }

          
        </div>
      </div>
    </div>

    {/* Cart Drawer */}
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
  <div className="flex justify-between p-4 border-b">
    <h1 className="text-xl font-bold text-black">My Cart</h1>
    <button className="text-xl" onClick={() => setIsCartOpen(false)}>✖</button>
  </div>

  {/* Cart Items - Allow flexible height */}
  <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
  {cart?.items?.map((item) => (
    <div key={item.bookId} className="flex p-2 border-b">
      {/* Fix Image Sizing */}
      <div className="w-16 h-20">
        <img className="w-full h-full object-cover rounded-md" src={item.imgurl} alt={item.name} />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h2 className="font-semibold text-sm text-black">{item.name}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 line-through text-sm">Rs. {item.originalPrice}</span>
          <span className="text-black font-semibold">Rs. {item.price}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
        <button className="px-2 text-black bg-gray-300 rounded hover:bg-red-300 transition" onClick={() => handleDecrementCartProduct(item.bookId, item.quantity)}>-</button>
          <span className="text-black">{item.quantity}</span>
          <button className="px-2 text-black bg-gray-300 rounded hover:bg-green-300 transition" onClick={() => handleIncrementCartProduct(item.bookId)}>+</button>
        </div>
      </div>

      {/* Delete Button */}
      <button onClick={() => handleRemoveCartItem(item.bookId)}>
        <Trash size={20} className="text-red-500 hover:text-red-700" />
      </button>
    </div>
  ))}
  <p className="ml-2 text-black font-semibold">Total Bill: {cartNew?.bill}</p>
</div>


  {/* Checkout Button - Always visible */}
  { cartNew?.items?.length > 0 ? (
    <div className="border-t border-indigo-600 p-4 bg-white">
    <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700" onClick={() => navigate("/checkout")}>
      Checkout
    </button>
  </div>
  ) : 
  <p className="ml-3">
    Your cart is empty
  </p>

  }
  
</div>

    <div className={`fixed top-0 left-0 h-full w-72 bg-gray-700 text-white shadow-lg transform transition-transform duration-300 z-50 
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
  
      {/* Close Button */}
      <div className="flex justify-between p-4 border-b border-gray-600">
        <h1 className="text-xl font-bold">Menu</h1>
        <button className="text-xl" onClick={() => setIsOpen(false)}>✖</button>
      </div>

        {/* Menu Items */}
        <ul className="p-4">
          <li className="p-2 border-b border-gray-600">
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li className="p-2 border-b border-gray-600">
            <Link to="/myprofile" className="hover:text-gray-400">My Profile</Link>
          </li>
          {
            loggedInUser ? (
              <li className="p-2">
                <Link className="hover:text-gray-400" onClick={() => handleLogout()}>Logout</Link>
              </li>
            ) : 
            <>
            <li className="p-2">
              <Link to="/login" className="hover:text-gray-400">Login</Link>
            </li>

            <li className="p-2">
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </li>
            </>
          }
          
        </ul>
    </div>
  
  </nav>
  );
};

export default Navbar2;