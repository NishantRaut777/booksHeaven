import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/BookCategories.css"
import { ChevronRight } from "lucide-react";

const BookCategories = () => {

    const categories = [
      { name: "Kids", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgjbsjEgfjEOGW7yaUefsqiGX-yskikCmusw&s" },
      { name: "Sports", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZASqGXvYTfHis_Fpt-AG5Tn8kmdVIZR7EaA&s" },
      { name: "Manga", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCWvcVK9oi9vQHgMazqozJr9fPqg5ZAxySg&s" },
      { name: "Cookery & Food", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRSYVwRj40k1ukDPBGJWEvMvZi2LRJXAlZA&s" },
      { name: "Biography", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuP0T54HXEx_xe8m-lsgH6XnQzYBJRzMogkQ&s" },
      { name: "Business Management", image: "/images/business.jpg" },
      { name: "International Law", image: "/images/law.jpg" },
      { name: "Agriculture & Farming", image: "/images/agriculture.jpg" },
      { name: "Coffee Table", image: "/images/coffee.jpg" },
      { name: "Hobbies Quizzes & Games", image: "/images/hobbies.jpg" },
    ];
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const handleCategoryClick = (category) => {
        navigate(`/category-books?category=${encodeURIComponent(category)}`)
    }

    const slideRight = () => {
      if(scrollContainerRef.current){
        scrollContainerRef.current.scrollBy({ left:200, behaviour: "smooth" });
      }
    };



  return (
    <>
      <div className="flex items-center space-x-2 md:space-x-4 my-10 pl-3 md:pl-10 pr-2">
        <div
          ref={scrollContainerRef}
          className="bookCategories-2-container flex overflow-x-auto  scroll-smooth w-[98%] scrollbar-hide md:w-[95%]"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat.name)}
              className="relative w-32 h-20 md:w-48 md:h-32  mr-2 md:mr-5 cursor-pointer shrink-0 rounded-md overflow-hidden group"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>

              {/* Soft black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Category name */}
              <div className="relative z-10 flex items-center justify-center h-full px-2 text-center text-white font-semibold text-sm md:text-base">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
        <div
          className="w-7 h-7 md:w-10 md:h-10 flex justify-center items-center text-2xl font-bold cursor-pointer hover:bg-[#f59f62] rounded-full"
          onClick={slideRight}
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}

export default BookCategories
