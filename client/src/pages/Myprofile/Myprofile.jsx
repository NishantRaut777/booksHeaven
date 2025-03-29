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
        <div className='py-4'>
            <div className='profile-info-div basis-1/2 flex flex-col items-center justify-center'>
                <div>
                    <img src={user?.profileImg} alt="" className='w-24 rounded-sm cursor-pointer'/>
                </div>

                <div className='mt-4 space-y-4 w-[70%] md:w-[40%]'>
                
                        <div className='flex flex-col'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" name='name' value={formData?.name} disabled={!isEditing} onChange={handleChange} className="w-full px-3 py-2 border rounded-sm focus:outline-none" required/>    
                        </div>

                        <div className='flex flex-col'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" name='email' value={formData?.email} disabled={!isEditing} onChange={handleChange} className="w-full px-3 py-2 border rounded-sm focus:outline-none" required/>

                            
                        </div>

                        <div className='flex flex-col'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" name='password' value={formData.password} disabled={!isEditing} onChange={handleChange} className="w-full px-3 py-2 border rounded-sm focus:outline-none" required/>
                            
                        </div>

                        <div className='flex gap-4 mt-4'>
                            { isEditing ? (
                                <button onClick={() => handleSave(formData)} className='w-28 px-4 py-2 bg-green-500 text-white rounded'>
                                    Save
                                </button>
                            ): (
                                <button onClick={handleEdit} className='w-28 px-4 py-2 bg-blue-500 text-white rounded'>
                                    Edit
                                </button>
                            ) }
                        </div>
                </div>
            </div> 

            <div className='myorders-div p-4'>
                <h2 className='text-xl font-semibold mb-4'>Your Orders</h2>
                { isLoadingOrders ? (
                    <p>Loading orders...</p>
                ) : orders?.length === 0 ? (
                    <p>No orders found</p>
                ): (
                    <>
                        {orders?.slice(0, showAllOrders ? orders?.length : 4)?.map((order) => (
                            <div key={order?._id} className='border p-4 rounded-md mb-4 shadow-sm'>
                            <p className="text-gray-800 font-medium">
                                    Date: {new Date(order?.date_added).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className='text-gray-600'>Total Bill: {order?.bill}</p>
                                <p className='text-gray-600'>Items:</p>
                                <ul className='flex flex-row flex-wrap list-disc pl-5'>
                                    { order?.items?.map((item) => (
                                        <li key={item?.bookId} className='text-gray-700 flex gap-3 mr-3 my-3'>
                                            <img src={item?.imgurl}  alt={item?.name} className='w-12 h-12 object-cover rounded' />
                                            <div>
                                                <p className='font-medium'>{item?.name}</p>
                                                <p>Quantity: {item?.quantity}</p>
                                                <p>Price: ₹{item?.price}</p>
                                            </div>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                        ))}
                    </>
                )}

                {orders?.length > 4 && (
                <button
                    onClick={() => setShowAllOrders(!showAllOrders)}
                    className="mt-4 text-blue-500 underline cursor-pointer"
                >
                    {showAllOrders ? "Show Less" : "See More"}
                </button>
            )}
            </div>
        </div>
        
    </>
    
  )
}

export default Myprofile
