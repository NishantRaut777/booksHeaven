import React, { useState, useRef } from 'react'
// import axios from "axios";
import axiosInstance from "../api/axios";
import Book from './Book';
import { useQuery } from '@tanstack/react-query';
import '../styles/CategoryBooks.css';
import useBookActions from '../hooks/useBookActions';
import leftIcon from '../assets/icons/leftIcon3.png';
import rightIcon from '../assets/icons/rightIcon3.png'
import bestSeller from '../assets/icons/bestSeller.png'
import awardWinner from '../assets/icons/awardWinners.png'
import internationalBestSeller from '../assets/icons/internationalBestSellers.png'
import newArrivals from '../assets/icons/newArrivals.png'
import fictionBooks from '../assets/icons/fictionBooks.png'
import childrenBooks from '../assets/icons/childrenBooks.png'
import comicBooks from '../assets/icons/comicBooks.png'


const CategoryBooks = () => {
    const categories = ["Romance","Mystery & Thriller", "Fantasy", "Adventure","Historical"];
    
    const categories2 = [{
      category_type: "Best Seller",
      logoURL: bestSeller
    },
    {
      category_type: "Award Winners",
      logoURL: awardWinner
    },
    {
      category_type: "International Best Sellers",
      logoURL: internationalBestSeller
    },
    {
      category_type: "New Arrivals",
      logoURL: newArrivals
    },
    {
      category_type: "Fiction Books",
      logoURL: fictionBooks
    },
    {
      category_type: "Children Books",
      logoURL: childrenBooks
    },
    {
      category_type: "Comic Books",
      logoURL: comicBooks
    },
    {
      category_type: "Law",
      logoURL: comicBooks
    },
    {
      category_type: "Medicine",
      logoURL: comicBooks
    },
  ]
    const [category, setCatgeory] = useState(categories[0]);
    const scrollContainerRef = useRef(null);

    const { fetchBooksByCategory } = useBookActions();
    
    const { data: books, isLoading, isError } = useQuery({
      queryKey: ["books", category],
      queryFn: () => fetchBooksByCategory(category),
      staleTime: 1000 * 60 * 2,
      keepPreviousData: true,      
    });

    if (isLoading) return <p>Loading books....</p>
    if (isError) return <p>Something went wrong</p>

    

    const scrollLeft = () => {
      if(scrollContainerRef.current){
        scrollContainerRef.current.scrollBy({
          left: -150,
          behaviour: "smooth"
        })
      }
    }

    const scrollRight = () => {
      if(scrollContainerRef.current){
        scrollContainerRef.current.scrollBy({
          left: 150,
          behaviour: "smooth"
        })
      }
    }

  return (
    <div className="">
      <div className="flex flex-row justify-center items-center py-6 md:space-x-4">
        <div className="left-logo cursor-pointer px-2 w-8 md:w-12" onClick={scrollLeft}>
          <img src={leftIcon}></img>
        </div>
        <div className="flex flex-row  overflow-x-auto mycategories-scroll-container w-5/5 md:w-4/5 pl-0 ml-0" ref={scrollContainerRef}>
          {categories2.map((cat, index) => (
            <div key={index} className="flex-shrink-0 flex flex-col justify-center items-center w-24 md:w-36 first:ml-0">
              <img src={cat?.logoURL} className='w-8 flex justify-center items-center'></img>
              <p className="px-5 py-2 cursor-pointer text-center">{cat?.category_type}</p>
            </div>
          ))}
        </div>

        <div className="right-logo cursor-pointer px-2 w-8 md:w-12" onClick={scrollRight}>
          <img src={rightIcon}></img>
        </div>
      </div>

      <div className="">
        {books && books.length > 0 ? (
          <div className="flex flex-row flex-nowrap overflow-x-auto md:gap-1 scrollbar-hidden">
            {books.map((book, index) => (
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
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
}

export default CategoryBooks