import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Navbar2 from "../../components/Navbar2";
import useBookActions from "../../hooks/useBookActions";
import { useQuery } from "@tanstack/react-query";
import Book from "../../components/Book";
import useCartActions from "../../hooks/useCartActions";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const SingleBook = () => {
  const { fetchRecommendedBooks } = useBookActions();
  const [book, setBook] = useState({});
  const [moreDescription, setMoreDescription] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const navigate = useNavigate();

  useEffect(() => {
    const getbook = async () => {
      const response = await axiosInstance.get(
        "/api/books/getBookById/" + path
      );
      setBook(response?.data?.book);
    };

    getbook();
  }, [path]);

  // getting recommended books whenever path changes
  const {
    data: recommendedBooks,
    isLoading: recommendedLoading,
    refetch,
  } = useQuery({
    queryKey: ["recommendedBooks", path],
    queryFn: () => fetchRecommendedBooks(book?.categories, path),
    enabled: !!book?.categories,
  });

  // Refetch recommendations when book updates since getting book is asynchronous, if not used it might send old book id
  useEffect(() => {
    if (book?.categories) {
      refetch();
    }
  }, [book, refetch]);

  const { addToCart } = useCartActions();

  const handleAddToCart = async () => {
    const item = {
      bookId: book._id,
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
      // message.error("Failed while adding book to cart");
      message.error("Please Login Again");
    }
  };

  const handleBuyNow = async () => {
    const item = {
      bookId: book._id,
      quantity: 1,
    };

    try {
      const res = await addToCart(item);
      // console.log(res.message);

      if (res && res.message) {
        navigate("/checkout");
      } else {
        // message.error("Failed while adding book to cart");
        message.error("Please Login Again");
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
      // message.error("Failed while adding book to cart");
      message.error("Please Login Again");
    }
  };

  return (
    <>
      <Navbar2 />
      <section className="single-book-section py-4 md:py-10 px-4  bg-gray-100">
        <div className="single-book-container flex flex-col md:flex-row">
          <div className="single-book-img py-2 flex justify-center md:w-[25%]">
            <img
              className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-md"
              src={book?.imgurl}
              alt=""
            />
          </div>

          <div className="single-book-details-container px-5 md:w-[75%]">
            <h1 className="text-3xl font-bold text-gray-800 mt-2 md:mt-0">{book.name}</h1>
            <p className="text-lg text-gray-600 my-1">
              by{" "}
              <span className="font-semibold text-gray-800">{book.author}</span>
            </p>
            <div className="text-lg my-2">
              <span className="line-through text-gray-500">
                Rs. {book.originalPrice}
              </span>
              <span className="text-red-600 font-semibold text-xl ml-2">
                Rs. {book.discountedPrice}
              </span>
            </div>
            <p className="text-gray-700">
              <span className="font-medium">Condition: </span>
              {book.condition}
            </p>

            <div className="flex flex-row my-4 space-x-4">
              <button
                className="w-36 rounded-sm py-2 border-2 border-black font-medium transition-all duration-300 hover:bg-black hover:text-white"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button
                className="w-36 rounded-sm py-2 bg-orange-500 text-white font-medium transition-all duration-300 hover:bg-orange-600"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            <div className="hidden md:block mb-4">
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p className="text-gray-600">{book.description}</p>
            </div>

            <div className="md:hidden mb-4 border border-gray-300 rounded-lg py-3 px-4">
              <div className="flex justify-between">
                <p className="font-medium text-lg">Description</p>
                <p
                  onClick={() => setMoreDescription(!moreDescription)}
                  className="cursor-pointer text-gray-600"
                >
                  {moreDescription ? "▲" : "▼"}
                </p>
              </div>
              {moreDescription && (
                <p className="text-gray-600 mb-2">{book.description}</p>
              )}
            </div>

            <div className="hidden md:block">
              <h2 className="font-semibold text-lg mb-2">Other Details</h2>
              <p className="text-gray-700">
                <span className="font-medium">Publisher:</span> {book.publisher}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Edition:</span> {book.edition}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Language:</span> {book.language}
              </p>
            </div>

            <div className="md:hidden mb-4 border border-gray-300 rounded-lg py-3 px-4">
              <div className="flex justify-between">
                <p className="font-medium text-lg mb-2">Other Details</p>
                <p
                  onClick={() => setMoreDetails(!moreDetails)}
                  className="cursor-pointer text-gray-600"
                >
                  {moreDetails ? "▲" : "▼"}
                </p>
              </div>
              {moreDetails && (
                <div className="text-gray-700">
                  <p>
                    <span className="font-medium">Publisher:</span>{" "}
                    {book.publisher}
                  </p>
                  <p>
                    <span className="font-medium">Edition:</span> {book.edition}
                  </p>
                  <p>
                    <span className="font-medium">Language:</span>{" "}
                    {book.language}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="recommended-books-section py-3">
        <h1 className="text-2xl font-bold text-center py-2">
          Recommended Books
        </h1>
        {recommendedLoading ? (
          <p>Loading Recommendations...</p>
        ) : (
          <div className="flex flex-row flex-nowrap overflow-x-auto md:gap-1 scrollbar-hidden">
            {recommendedBooks?.map((book, index) => (
              <Book
                index={index}
                bookId={book._id}
                imgurl={book.imgurl}
                name={book.name}
                author={book.author}
                originalPrice={book.originalPrice}
                discountedPrice={book.discountedPrice}
                rating={book.rating}
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default SingleBook;