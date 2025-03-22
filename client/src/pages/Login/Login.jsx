import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import useLogin from '../../hooks/useLogin';

const Login = () => {

  const loginMutation = useLogin();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({  ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      loginMutation.mutate(formData);
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Login
        </h2>
        
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm border rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm border rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
       
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-400"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Logging in..." : "Log in"}
        </button>
        {loginMutation.isError && (
          <p className="mt-4 text-sm text-red-500">
            {loginMutation.error.response?.data?.message || "Something went wrong!"}
          </p>
        )}
        {loginMutation.isSuccess && (
          <p className="mt-4 text-sm text-green-500">{loginMutation.data.message}</p>
        )}
      </form>
    </div>
  )
}

export default Login
