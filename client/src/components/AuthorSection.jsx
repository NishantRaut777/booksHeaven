import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'
import useAuthorActions from '../hooks/useAuthorActions';
import { ChevronRight } from "lucide-react";
import "../styles/AuthorSection.css"
import { useNavigate } from 'react-router-dom';
import leftIcon from '../assets/icons/leftIcon3.png'
import rightIcon from '../assets/icons/rightIcon3.png'
import AuthorSkeleton from './AuthorSkeleton';

const AuthorSection = () => {
    const scrollContainerRef = useRef(null);

    const { fetchAllAuthors } = useAuthorActions();
    const navigate = useNavigate();

    // const slideRight = () => {
    //     if(scrollContainerRef.current){
    //         scrollContainerRef.current.scrollBy({ left: 200, behaviour: "smooth" });
    //     }
    // }

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

    const handleAuthorClick = (authorname) => {
        navigate(`/authorBooks?author=${encodeURIComponent(authorname)}`)
    }

    const {data: authorsData, isLoading: isAuthorsLoading, isError: isAuthorError} = useQuery({
        queryKey: ["authors"],
        queryFn: fetchAllAuthors
    })

    // if(authorsData){
    //     console.log(authorsData);
    // }

    if (isAuthorsLoading) {
      return (
        <div className="myauthors-container md:mx-12 pb-12 mb-12 bg-gray-100">
          <h1 className="text-center p-3 text-2xl font-bold">Featured Authors</h1>
          <div className="authors-inner-container flex flex-row">
            <div className="flex items-center left-logo w-20 p-3" />
            
            <div className="flex flex-row gap-2 overflow-x-auto featuredAuthors-scroll-container py-8 md:p-0">
              {Array(6).fill(0).map((_, index) => (
                <AuthorSkeleton key={index} />
              ))}
            </div>

            <div className="flex items-center right-logo w-20 p-3" />
          </div>
        </div>
    );

    }

    if (isAuthorError) return <p>Error Occured while getting authors</p>

  return (
    <>
      {/* <div className="flex items-center pr-2 py-12 md:pt-16 pl-10 md:py-14 bg-[#ede6e4]">
        <div
          className="author-scroll-container flex flex-row gap-7 overflow-x-auto scroll-smooth whitespace-nowrap w-[98%] scrollbar-hide md:w-[95%]"
          ref={scrollContainerRef}
        >
          {authorsData?.map((author) => (
            <div className="flex flex-col" onClick={() => handleAuthorClick(author?.name)}>
              <div className="w-28 h-28 md:w-48 md:h-48">
                <img
                  src={author?.imgsrc}
                  alt=""
                  className="w-full h-full rounded-md cursor-pointer"
                />
              </div>
              <p className="text-center mt-3">{author?.name}</p>
            </div>
          ))}
        </div>

        <div
          className="w-10 h-10 flex justify-center items-center text-2xl font-bold cursor-pointer hover:bg-[#f59f62] transition duration-700 ease-in-out rounded-full mx-4"
          onClick={slideRight}
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      </div> */}

      <div className="myauthors-container md:mx-12 pb-12 mb-12 bg-gray-100">
        <h1 className="text-center p-3 text-2xl font-bold">Featured Authors</h1>
        <div className="authors-inner-container flex flex-row">
          <div
            className="flex items-center left-logo cursor-pointer w-20 p-3"
            onClick={scrollLeft}
          >
            <img src={leftIcon}></img>
          </div>

          <div
            className="flex flex-row gap-2 overflow-x-auto featuredAuthors-scroll-container py-8 md:p-0"
            ref={scrollContainerRef}
          >
            {authorsData?.map((author) => (
              <div
                className="flex flex-col"
                onClick={() => handleAuthorClick(author?.name)}
              >
                <div className="w-28 h-28 md:w-52 md:h-56">
                  <img
                    src={author?.imgsrc}
                    alt=""
                    className="w-full h-full cursor-pointer"
                  />
                </div>
                <p className="text-center text-lg mt-3">{author?.name}</p>
              </div>
            ))}
          </div>

          <div
            className="flex items-center right-logo cursor-pointer w-20 p-3"
            onClick={scrollRight}
          >
            <img src={rightIcon}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthorSection