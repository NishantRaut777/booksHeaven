import React from "react";
import useCartActions from "../hooks/useCartActions";
import { message } from "antd";
import { Link } from "react-router-dom";

const Book = ({
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
      // console.log(res.message);

      if (res && res.message) {
        message.success(res.message);
      } else {
        message.error("Please Login Again");
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
      message.error("Please Login again");
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
      className="flex flex-col w-48 md:w-60 h-full flex-shrink-0 border-2 pt-4 cursor-pointer"
    >
      <div className="book-info-div">
        <div className="image-div flex justify-center h-24 md:h-36">
          <Link to={`/book/${bookId}`}>
            <img
              src={imgurl}
              className="w-20 md:w-28 h-full cursor-pointer"
              alt="myimage"
            />
          </Link>
        </div>

        <div className="book-info-div p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {name}
          </h3>
          <h3 className="text-sm text-gray-600 line-clamp-1">
            by  {author?.join(", ")}
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
          onClick={handleAddToCart}
          className="p-3 m-2 cursor-pointer bg-purple-200 rounded-sm transition-all duration-300 ease-in-out hover:bg-orange-300 "
        >
          Add to cart
        </span>
      </div>
    </div>
  );
};

export default Book;
