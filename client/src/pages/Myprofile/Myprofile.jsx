import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchUser from "../../hooks/useFetchUser";
import Navbar2 from "../../components/Navbar2";
import useUserActions from "../../hooks/useUserActions";
import { useMutation, useQuery } from "@tanstack/react-query";
import useOrderActions from "../../hooks/useOrderActions";
import "./Myprofile.css";
import Footer from "../../components/Footer";
import { Pencil, Check } from "lucide-react";
import defaultProfileImg from '../../assets/icons/profileImageDefault.avif'
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import MyProfileSkeleton from "../../components/skeletons/MyProfileSkeleton";

const Myprofile = () => {
  const userFrmState = useSelector((state) => state.user.user);
  const { user } = useFetchUser();
  const { updateUser } = useUserActions();
  const { fetchOrders } = useOrderActions();

  const navigate = useNavigate();

  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAllItems, setShowAllItems] = useState({}); // ✅ moved to top level

  const toggleItems = (orderId) => {
    setShowAllItems((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const updateUserMutation = useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = (data) => {
    updateUserMutation.mutate(data);
    setIsEditing(false);
  };

   useEffect(() => {
          if (isErrorOrders) {
            message.error("Please Login Again");
            navigate("/login");
          }
      }, [isErrorOrders, navigate]);

  return (
    <>
      <Navbar2 />

      <div className="profile-info-div flex flex-row mx-7 my-4 px-3 py-3 bg-[#ff52001a] rounded-md">
        <div className="image-div">
          <img
            src={user?.profileImg || defaultProfileImg}
            className="w-20 h-20 rounded-full cursor-pointer border-2"
            alt="Profile"
          />
        </div>

        <div className="flex flex-col justify-center ml-5">
          <p className="mb-1">{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="my-orders-container px-6 pb-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Your Orders
        </h2>

        {isLoadingOrders ? (
          <MyProfileSkeleton />
        ) : orders?.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <>
            {orders
              ?.slice(0, showAllOrders ? orders?.length : 4)
              ?.map((order) => {
                const orderItems = order?.items || [];
                const firstItem = orderItems[0];
                const remainingCount = orderItems.length - 1;
                const showAll = showAllItems[order?._id];

                return (
                  <div
                    key={order?._id}
                    className="border p-4 rounded-md mb-4 shadow-sm bg-gray-50 "
                  >
                    <p className="text-gray-800 font-medium">
                      Date:{" "}
                      {new Date(order?.date_added).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-600">Total Bill: ₹{order?.bill}</p>
                    <p className="text-gray-600">Items:</p>

                    <ul className="flex flex-col gap-2 list-disc">
                      <li
                        key={firstItem?.bookId}
                        className="text-gray-700 flex gap-3  px-3 py-3 bg-[#5600ff1a] rounded-sm"
                      >
                        <img
                          src={firstItem?.imgurl}
                          alt={firstItem?.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{firstItem?.name}</p>
                          <p>Quantity: {firstItem?.quantity}</p>
                          <p>Price: ₹{firstItem?.price}</p>
                        </div>
                      </li>

                      {showAll &&
                        orderItems.slice(1).map((item) => (
                          <li
                            key={item?.bookId}
                            className="text-gray-700 flex gap-3 px-3 py-3 bg-[#5600ff1a] rounded-sm"
                          >
                            <img
                              src={item?.imgurl}
                              alt={item?.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item?.name}</p>
                              <p>Quantity: {item?.quantity}</p>
                              <p>Price: ₹{item?.price}</p>
                            </div>
                          </li>
                        ))}
                    </ul>

                    {remainingCount > 0 && (
                      <button
                        onClick={() => toggleItems(order?._id)}
                        className="text-blue-500 underline mt-2 text-sm"
                      >
                        {showAll
                          ? "Show Less"
                          : `+${remainingCount} more`}
                      </button>
                    )}
                  </div>
                );
              })}
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

      <Footer />
    </>
  );
};

export default Myprofile;
