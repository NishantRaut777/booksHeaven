import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import useLogin from '../../hooks/useLogin';
import { Link } from 'react-router-dom';
import "./Login.css"

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
    <div className="login-main-container flex  items-center justify-center h-screen bg-[#454241]">
      <form
        className="w-[90%] md:w-full max-w-md p-6 bg-white rounded-sm shadow-md"
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

        <div className="flex flex-col">
          <div className="flex flex-row buttons-div">
            <div className="mr-3">
              <button
                type="submit"
                className="w-24 md:w-full px-2 md:px-5 py-2 text-white bg-blue-500 rounded-sm hover:bg-blue-600 focus:ring focus:ring-blue-400"
                disabled={loginMutation.isLoading}
              >
                {loginMutation.isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>

            <div className=''>
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-24 md:w-full px-2 md:px-5 py-2 bg-green-400 rounded-sm hover:bg-green-500 "
              >
                Register
              </Link>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default Login