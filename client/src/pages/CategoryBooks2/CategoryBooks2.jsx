import React from "react";
import Navbar2 from "../../components/Navbar2";
import { useLocation } from "react-router-dom";
// import useBookActions from "../../hooks/useBookActions";
import useBookActions from "../../hooks/useBookActions";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Book from "../../components/Book";
import Book2 from "../../components/Book2";

const CategoryBooks2 = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    const { fetchBooksByCategory } = useBookActions();

    const { data: books, isLoading, isError } = useQuery({
      queryKey: ["books", category],
      queryFn: () => fetchBooksByCategory(category),
      enabled: !!category,
    });

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto mt-5 flex flex-col px-3 pb-12">
        { isLoading && <p>Loading Books....</p> }
        { isError && <p>Something went wrong</p> }

        <div className="my-3">
          <Link to={`/`} className="flex items-center gap-2 text-black-500 hover:text-black-700 transition-transform duration-200 active:scale-95">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Go Back</span>
          </Link>
        </div>

        <div className="flex flex-row flex-wrap gap-3">
            { books?.length > 0 ? (
                books?.map((book,index) => (
                  <Book2 index={index} bookId={book._id} imgurl={book.imgurl} name={book.name} author={book.author} originalPrice={book.originalPrice} discountedPrice={book.discountedPrice} rating={book.rating} />
                ))
            ): (
                <p>No Books available for this category</p>
            ) }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryBooks2;