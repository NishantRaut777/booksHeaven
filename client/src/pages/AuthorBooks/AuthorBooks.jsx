import React from 'react'
import { useLocation } from "react-router-dom";
import useBookActions from '../../hooks/useBookActions';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar2 from "../../components/Navbar2";

const AuthorBooks = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const author = queryParams.get("author");

    const { fetchAuthorBooks } = useBookActions();

    const { data: books, isLoading, isError } = useQuery({
      queryKey: ["authorBooks", author],
      queryFn: () => fetchAuthorBooks(author),
      enabled: !!author,
    });

    console.log("AUTHOR BOOKS ", books);

  return (
    <>
         <Navbar2 />
      <div className="container mx-auto mt-5 flex flex-col px-3">
        { isLoading && <p>Loading Books....</p> }
        { isError && <p>Something went wrong</p> }

        <div className="my-3">
          <Link to={`/`}>
          Go Back
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            { books?.length > 0 ? (
                books?.map((book) => (
                    <div key={book._id} className="border p-4">
                    <Link to={`/book/${book?._id}`}>
                        <div className="w-full h-48">
                        <img src={book.imgurl} alt={book.name} className="w-full h-full" />
                        </div>
                        
                        </Link>
                        <h3 className="text-lg font-semibold">{book.name}</h3>
                        <p>{book.author}</p>
                    </div>
                ))
            ): (
                <p>No Books available for this author</p>
            ) }
        </div>
      </div>
    </>
  )
}

export default AuthorBooks
