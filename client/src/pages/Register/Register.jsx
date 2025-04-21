import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const formDataToSend = new FormData();
      formDataToSend.append("name", newUser.name);
      formDataToSend.append("email", newUser.email);
      formDataToSend.append("password", newUser.password);
      if (newUser.image) formDataToSend.append("image", newUser.image);
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" }, validateStatus: () => true } // <= accept all status codes
        );
        return { data: response.data, status: response.status };
      } catch (err) {
        throw err;
      }
    },
  
    onSuccess: ({ data, status }) => {
      if (status === 201) {
        alert("User registered successfully: " + data.message);
        navigate(`/verify-otp?email=${formData.email}`);
      } else if (status === 209) {
        alert(data.message); // "Otp Already sent"
        navigate(`/verify-otp?email=${formData.email}`);
      } else {
        alert("Registration response: " + data.message);
      }
    },
  
    onError: (error) => {
      alert(
        "Registration failed: " + error.response?.data?.message || error.message
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Register
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm border rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Profile Image (optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row buttons-div">
            <div className="mr-3">
              <button
                type="submit"
                className="w-full px-10 py-2 text-white bg-blue-500 rounded-sm hover:bg-blue-600 focus:ring focus:ring-blue-400"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Registering..." : "Register"}
              </button>
            </div>

            <div className="">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-10 py-2 bg-green-400 rounded-sm hover:bg-green-500"
              >
                Already a user?
              </Link>
            </div>
          </div>

          <div className="register-status-div">
            {mutation.isError && (
              <p className="mt-4 text-sm text-red-500">
                {mutation.error.response?.data?.message ||
                  "Something went wrong!"}
              </p>
            )}
            {mutation.isSuccess && (
              <p className="mt-4 text-sm text-green-500">
                {mutation.data.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;