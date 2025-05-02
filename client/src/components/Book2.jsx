import React from "react";
import useCartActions from "../hooks/useCartActions";
import { message } from "antd";
import { Link } from "react-router-dom";

const Book2 = ({
  index,
  bookId,
  imgurl,
  name,
  author,
  originalPrice,
  discountedPrice,
  rating,
}) => {
  const { addToCart } = useCartActions();

  const handleAddToCart = async () => {
    const item = {
      bookId: bookId,
      quantity: 1,
    };

    try {
      const res = await addToCart(item);
      console.log(res.message);

      if (res && res.message) {
        message.success(res.message);
      } else {
        message.error("Failed while adding book to cart");
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
      message.error("Failed while adding book to cart");
    }
    // await addToCart(item)
    // .then((res) => {
    //   console.log(res);
    //   // alert(res.message);

    // })
    // .catch((error) => console.log("Error adding item to the cart"));
  };

  return (
    <div
      key={index}
      className="flex flex-col w-full h-full md:w-60 flex-shrink-0 border-2 md:pt-4 cursor-pointer"
    >
      <div className="book-info-div py-2 flex flex-row items-center md:flex-col">
        <div className="image-div flex justify-center items-center  ml-3 w-28 h-28 md:ml-0 md:w-32 md:h-32 flex-shrink-0">
          <Link to={`/book/${bookId}`} className="w-full h-full">
            <img
              src={imgurl}
              className="w-full h-full cursor-pointer"
              alt="myimage"
            />
          </Link>
        </div>

        <div className="book-info-div-inner ml-4 md:ml-0 p-4 bg-white shadow-md rounded-lg w-full">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {name}
          </h3>
          <h3 className="text-sm text-gray-600 line-clamp-1">
            by <span className="text-gray-700 font-medium">{author}</span>
          </h3>

          <div className="flex items-center space-x-2 mt-1">
            <span className="text-lg font-semibold text-green-600">
              Rs. {discountedPrice}
            </span>
            <span className="text-sm text-gray-500 line-through">
              Rs. {originalPrice}
            </span>
          </div>

          <div className="flex items-center mt-2">
            ⭐{" "}
            <span className="text-sm text-gray-700 font-medium">{rating}</span>
          </div>
        </div>
      </div>

      <div className="add-to-cart-div flex flex-row justify-between bg-gray-100 ">
        <span
          onClick={(e) => {
            e.currentTarget.blur();
            handleAddToCart();
          }}
          className="p-3 m-2 cursor-pointer bg-purple-200 rounded-sm transition-all duration-300 ease-in-out hover:bg-orange-300 active:bg-purple-200"
        >
          Add to cart
        </span>
      </div>
    </div>
  );
};

export default Book2;