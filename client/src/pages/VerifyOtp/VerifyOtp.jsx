import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get("email");

    const mutation = useMutation({
        mutationFn: async(data) => {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/verify-otp`, data);
            return response.data;
        },
        onSuccess: (data) => {
            // alert("Email Verified successfully");
            message.success(data.message);
            navigate("/login");
        },
        onError: (data) => {
          message.error(data.message);
            // alert(error?.response?.data?.message || "OTP verification failed");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !otp){
            return alert("Email or Otp is missing");
        }

        mutation.mutate({ email, otp });
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <form
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Verify OTP
        </h2>
        <p className="mb-4 text-sm text-gray-600 text-center">
          OTP sent to <strong>{email}</strong>
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-3 py-2 mb-4 text-sm border rounded-md focus:ring focus:ring-blue-500"
          required
        />

        <div className="flex flex-row">
          <button
            type="submit"
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-sm hover:bg-blue-600 cursor-pointer"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Verifying.." : "Verify OTP"}
          </button>

          <div className="">
            <Link
              to="/resendOtp"
              className="inline-flex items-center justify-center px-10 py-2 bg-green-400 rounded-sm hover:bg-green-500"
            >
              Resend OTP
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp
