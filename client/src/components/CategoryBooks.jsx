import React, { useState } from 'react'
// import axios from "axios";
import axiosInstance from "../api/axios";
import Book from './Book';
import { useQuery } from '@tanstack/react-query';
import '../styles/CategoryBooks.css';
import useBookActions from '../hooks/useBookActions';


const CategoryBooks = () => {
    const categories = ["Romance","Mystery & Thriller", "Fantasy", "Adventure","Historical"];
    const [category, setCatgeory] = useState(categories[0]);

    const { fetchBooksByCategory } = useBookActions();
    
    const { data: books, isLoading, isError } = useQuery({
      queryKey: ["books", category],
      queryFn: () => fetchBooksByCategory(category),
      staleTime: 1000 * 60 * 2,
      keepPreviousData: true,      
    });

    if (isLoading) return <p>Loading books....</p>
    if (isError) return <p>Something went wrong</p>

  return (
    <div className='py-8'>
      <h3 className='text-center font-semibold text-lg md:text-2xl'>Fiction Addiction</h3>
      <div className='flex justify-center '>
      <ul className='flex justify-center flex-wrap'>
        {categories.map((cat, index) => (
            <li key={index} className='inline-block ml-1 cursor-pointer hover:text-orange-500 transition-colors duration-200' onClick={() => setCatgeory(encodeURIComponent(cat))}>
                {cat} {index !== categories.length - 1 ? <span className='text-black'> | </span> : ""}
            </li>
        )
        )}
       </ul>
      </div>

      <div className='mt-4'>
        {books && books.length > 0 ? (
          <div className='flex flex-row flex-nowrap overflow-x-auto md:gap-1 scrollbar-hidden'>
            { books.map((book, index) => <Book index={index} bookId={book._id} imgurl={book.imgurl} name={book.name} author={book.author} originalPrice={book.originalPrice} discountedPrice={book.discountedPrice} rating={book.rating} />) }
            </div>
        ):
        (
          <p>No books available</p>
        )
        }
      </div>   
    </div>
  )
}

export default CategoryBooks