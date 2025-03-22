import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/BookCategories.css"
import { ChevronRight } from "lucide-react";

const BookCategories = () => {
    const categories = ["Kids","Sports","Manga","Cookery & Food",,"Biography","Business Management","International Law","Agriculture & Farming","Coffee Table","Hobbies Quizzes & Games"];
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
    <div className='flex items-center space-x-4 my-10 pl-10 pr-2'>
         <div ref={scrollContainerRef} className='bookCategories-2-container flex space-x-5 overflow-x-auto  scroll-smooth whitespace-nowrap w-[98%] scrollbar-hide md:w-[95%]'>
        { categories.map((cat, index) => (
            <div key={index} 
            className='w-32 h-20 border border-red-600 mr-5 flex justify-center items-center cursor-pointer shrink-0 rounded-md md:w-48 md:h-32' onClick={() => handleCategoryClick(cat)}>
                {cat}
            </div>
        ))

        }
    </div>
    <div className='w-10 h-10 flex justify-center items-center text-2xl font-bold cursor-pointer bg-[#f59f62] rounded-full' onClick={slideRight}>
    <ChevronRight className="w-5 h-5" />
    </div>
    </div>
    </>
  )
}

export default BookCategories
