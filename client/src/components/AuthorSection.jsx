import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'
import useAuthorActions from '../hooks/useAuthorActions';
import { ChevronRight } from "lucide-react";
import "../styles/AuthorSection.css"
import { useNavigate } from 'react-router-dom';

const AuthorSection = () => {
    const scrollContainerRef = useRef(null);

    const { fetchAllAuthors } = useAuthorActions();
    const navigate = useNavigate();

    const slideRight = () => {
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({ left: 200, behaviour: "smooth" });
        }
    }

    const handleAuthorClick = (authorname) => {
        navigate(`/authorBooks?author=${encodeURIComponent(authorname)}`)
    }

    const {data: authorsData, isLoading: isAuthorsLoading, isError: isAuthorError} = useQuery({
        queryKey: ["authors"],
        queryFn: fetchAllAuthors
    })

    if(authorsData){
        console.log(authorsData);
    }

    if (isAuthorsLoading) return <p>Loading Authors...</p>
    if (isAuthorError) return <p>Error Occured while getting authors</p>

  return (
    <>
      <div className="flex items-center pl-10 py-7">
        <div
          className="author-scroll-container flex flex-row gap-7 overflow-x-auto scroll-smooth whitespace-nowrap w-[98%] scrollbar-hide md:w-[95%]"
          ref={scrollContainerRef}
        >
          {authorsData?.map((author) => (
            <div className="flex flex-col" onClick={() => handleAuthorClick(author?.name)}>
              <div className="w-32 h-40 md:w-48 md:h-48">
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
          className="w-10 h-10 flex justify-center items-center text-2xl font-bold cursor-pointer bg-[#f59f62] rounded-full"
          onClick={slideRight}
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}

export default AuthorSection
