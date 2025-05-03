import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { message } from 'antd';

const ResendOTP = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async(data) => {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/resend-otp`, data);
            return response.data;
        },
        onSuccess: (data) => {
            // alert("Otp sent successfully");
            message.success(data.message);
            navigate(`/verify-otp?email=${email}`);
        },
        onError: (data) => {
            // alert(error?.response?.data?.message || "OTP Send failed");
            message.error(data.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email){
            return alert("Email is missing");
        }

        mutation.mutate({ email });
    };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-800'>
       <form className='w-full max-w-md p-6 bg-white rounded-lg shadow-md' onSubmit={handleSubmit}>
            <h2 className='mb-4 text-2xl font-bold text-center text-gray-700'>Resend OTP</h2>
            

            <input type='email' onChange={(e) => setEmail(e.target.value)}  placeholder='Enter Your Email Address'  value={email} className='w-full px-3 py-2 mb-4 text-sm border rounded-md focus:ring focus:ring-blue-500' required/>

            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer">
                { mutation.isPending ? "Sending.." : "Resend OTP" }
            </button>
       </form> 
    </div>
  )
}

export default ResendOTP
