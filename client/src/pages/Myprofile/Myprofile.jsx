import React, { useState } from 'react'
// import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import useFetchUser from '../../hooks/useFetchUser';
import { Pencil, Check } from "lucide-react";
import Navbar2 from '../../components/Navbar2';
import useUserActions from '../../hooks/useUserActions';
import { useMutation } from '@tanstack/react-query';
import useOrderActions from '../../hooks/useOrderActions';
import { useQuery } from '@tanstack/react-query';
import "./Myprofile.css";
import Footer from '../../components/Footer';

const Myprofile = () => {
    // const dispatch = useDispatch();
    const userFrmState = useSelector((state) => state.user.user);
    const { user } = useFetchUser();
    const { updateUser } = useUserActions();
    console.log(user);

    const { fetchOrders } = useOrderActions();

    const { data: orders, isLoadingOrders, isErrorOrders } = useQuery({
        queryKey: ["orders"],
        queryFn: () => fetchOrders(),
        staleTime: 1000 * 60 * 2,
        keepPreviousData: true,      
      });

    console.log("ORDERS", orders);


    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const  [showAllOrders, setShowAllOrders] = useState(false);

    const updateUserMutation = useMutation({
        mutationFn: (data) => updateUser(data),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleChange= async(e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (data) => {
        // setEditableField(null);
        updateUserMutation.mutate(data);
        setIsEditing(false);
    }

  return (
    <>
        <Navbar2 />
        <div className="py-6 flex flex-col md:flex-row md:justify-between gap-8">
            <div className="flex flex-col items-center w-full md:w-[55%] p-6 bg-white shadow-lg rounded-lg">
                <div className="hover:scale-105 transition-transform">
                    <img 
                        src={user?.profileImg} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full cursor-pointer border-2 border-blue-500" 
                    />
                </div>

                <div className="mt-6 space-y-6 w-[80%] md:w-[60%]">
                    {['name', 'email', 'password'].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input 
                                type={field === 'password' ? 'password' : 'text'}
                                name={field} 
                                value={formData?.[field]} 
                                disabled={!isEditing} 
                                onChange={handleChange} 
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all disabled:bg-gray-100"
                            />    
                        </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                        {isEditing ? (
                            <button onClick={() => handleSave(formData)} className="w-28 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all active:scale-95">
                                Save
                            </button>
                        ) : (
                            <button onClick={handleEdit} className="w-28 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all active:scale-95">
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div> 

            <div className="myprofile-orders-scroll-container p-6 w-full md:w-[45%] bg-white shadow-lg rounded-lg md:h-[90vh] md:overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Orders</h2>
                {isLoadingOrders ? (
                    <p className="text-gray-500">Loading orders...</p>
                ) : orders?.length === 0 ? (
                    <p className="text-gray-500">No orders found</p>
                ) : (
                    <>
                        {orders?.slice(0, showAllOrders ? orders?.length : 4)?.map((order) => (
                            <div key={order?._id} className="border p-4 rounded-md mb-4 shadow-sm bg-gray-50 hover:scale-105 transition-transform">
                                <p className="text-gray-800 font-medium">
                                    Date: {new Date(order?.date_added).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-gray-600">Total Bill: ₹{order?.bill}</p>
                                <p className="text-gray-600">Items:</p>
                                <ul className="flex flex-row flex-wrap list-disc pl-5">
                                    {order?.items?.map((item) => (
                                        <li key={item?.bookId} className="text-gray-700 flex gap-3 mr-3 my-3">
                                            <img src={item?.imgurl} alt={item?.name} className="w-12 h-12 object-cover rounded" />
                                            <div>
                                                <p className="font-medium">{item?.name}</p>
                                                <p>Quantity: {item?.quantity}</p>
                                                <p>Price: ₹{item?.price}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}

                {orders?.length > 4 && (
                    <button
                        onClick={() => setShowAllOrders(!showAllOrders)}
                        className="mt-4 text-blue-500 underline cursor-pointer active:scale-95"
                    >
                        {showAllOrders ? "Show Less" : "See More"}
                    </button>
                )}
            </div>
        </div>
    <Footer />
        
    </>
    
  )
}

export default Myprofile
