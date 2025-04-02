import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BookCategories.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BookCategories = () => {
  const categories = [
    {
      name: "Kids",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYYrgb2h3MUNH8US9rIYvPj9dfyQP427rqSxwwPDOXoIT9szznkzUFndw&s",
    },
    {
      name: "Sports",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1Ndk8ATEUiZpGdyzYd4nq8IXtRBK4wbgUg&s",
    },
    {
      name: "Manga",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST0iVJOnBMtcZKv9ry5C-_NNruMbhjYJd87g&s",
    },
    {
      name: "Cookery & Food",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4z4zjzRhk2SCHPdcqZ7V_7CIBAxTqsIUchw&s",
    },
    {
      name: "Biography",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiWtzFNSujnvpGWUz0xq_0qYgcDYsEYkpy9Q&s",
    },
    {
      name: "Business Management",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSSvn7CyZzp8fJwhXpy3B-6ElgM-AGp0pHjg&s",
    },
    {
      name: "International Law",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87mkOcO6lxVPKnHwf3BJibggnxmSYxBvx6A&s",
    },
    {
      name: "Agriculture & Farming",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFzbJrgBNXQaCwjaxulDKnBQyhSjDR-6YFfQ&s",
    },
    {
      name: "Coffee Table",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRpVUn3YVP3fUPojQzgD0lKGEVLk8XG2Db_w&s",
    },
    {
      name: "Hobbies Quizzes & Games",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn-KyZbCgGxvetkwD5MlVLgkdqmp82K5mEQw&s",
    },
  ];

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const handleCategoryClick = (category) => {
    navigate(`/category-books?category=${encodeURIComponent(category)}`);
  };

  const slideRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behaviour: "smooth" });
    }
  };

  return (
    <>
      <div className="py-5 bg-gray-50">
        <div className="md:hidden flex justify-center items-center py-5">
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 8).map((cat, index) => (
              <div
                key={index}
                className="relative w-[40vw] h-32 border border-red-600 flex justify-center items-center cursor-pointer rounded-md overflow-hidden bg-cover bg-center after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-50"
                style={{ backgroundImage: `url(${cat.image})` }}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="relative z-10 text-white font-bold text-sm px-2 py-1 text-center whitespace-normal leading-tight">
                  {cat.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 pl-4 pr-2 md:pl-10">
          <div
            ref={scrollContainerRef}
            className="bookCategories-2-container flex space-x-5 overflow-x-auto  scroll-smooth whitespace-nowrap w-[98%] scrollbar-hide md:w-[95%]"
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                className="relative w-32 h-20 md:w-48 md:h-32 border border-red-600 flex justify-center items-center cursor-pointer shrink-0 rounded-md overflow-hidden bg-cover bg-center after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-50"
                style={{ backgroundImage: `url(${cat.image})` }}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="relative z-10 text-white font-bold text-sm md:text-lg px-2 py-1 rounded-md text-center whitespace-normal leading-tight">
                  {cat.name}
                </div>
              </div>
            ))}
          </div>
          <div
            className="w-10 h-10 flex justify-center items-center text-2xl font-bold cursor-pointer hover:bg-[#f59f62] transition duration-700 ease-in-out  rounded-full"
            onClick={slideRight}
          >
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCategories;
