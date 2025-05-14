import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axios';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useBookActions from '../../hooks/useBookActions';
import { useQuery } from '@tanstack/react-query';
import Navbar2 from '../../components/Navbar2';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import { Dialog } from '@headlessui/react';
import { Filter } from 'lucide-react';
import Footer from "../../components/Footer"
import "./Search.css"

const Search = () => {
    
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchTerm = urlParams.get("searchTerm") || "";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [priceRange, setPriceRange] = useState([0,1000]);

  // mobile drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => 
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) => 
      prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]
    );
  };

  const { fetchFilteredBooks, fetchBookFilters } = useBookActions();

  const { data: filteredBooks, isLoading, isError } = useQuery({
    queryKey: ["filteredBooks", searchTerm, selectedCategories, selectedAuthors, priceRange],
    queryFn: () => fetchFilteredBooks(searchTerm, selectedCategories, selectedAuthors, priceRange),
    enabled: !!searchTerm || selectedCategories.length > 0 || selectedAuthors.length > 0 || priceRange.length > 0,
  });

  const { data: bookFilters, isLoading: isFiltersLoading, isError: isFiltersError }= useQuery({
    queryKey: ["bookFilters"],
    queryFn: () => fetchBookFilters()
  });

  useEffect(() => {
    if (!isFiltersLoading && bookFilters?.price) {
      setPriceRange([bookFilters.price[0], bookFilters.price[1]]);
    }
  }, [bookFilters, isFiltersLoading]);


  if (isLoading) return <p>Loading Books...</p>
  if (isError) return <p>Eroor</p>


  return (
    <>
      <Navbar2 />

      <div className="md:hidden flex justify-between items-center p-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border rounded-md font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <Dialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden"
      >
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={() => setIsFilterOpen(false)}
        ></div>

        <div className="relative bg-white w-3/4 h-full shadow-lg p-4 overflow-y-auto dialog-container">
          <button
            className="absolute top-2 right-2 text-xl font-semibold text-gray-600 hover:text-gray-700 transition"
            onClick={() => setIsFilterOpen(false)}
          >
            ✕
          </button>

          {/* Filter Content */}
          <div className="overflow-y-auto h-full p-4">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>

            {/* Categories */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Categories
              </h3>
              {bookFilters?.categories?.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className="cursor-pointer hover:bg-blue-100 px-2 rounded transition">
                    {category}
                  </label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Price Range
              </h3>
              <Slider
                range
                min={bookFilters?.price?.[0] || 0}
                max={bookFilters?.price?.[1] || 1000}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
              />
              <div className="flex justify-between mt-2 text-gray-600 font-medium">
                <span>Rs. {priceRange[0]}</span>
                <span>Rs. {priceRange[1]}</span>
              </div>
            </div>

            {/* Authors */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Authors
              </h3>
              {bookFilters?.authors?.map((author) => (
                <div key={author} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleAuthorChange(author)}
                  />
                  <span
                    className="truncate max-w-[150px] block text-gray-700 font-medium hover:bg-blue-100 px-2 rounded transition cursor-pointer"
                    title={author}
                  >
                    {author.length > 20 ? author.slice(0, 20) + "..." : author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>

      {/* Books Listing */}
      <div className="md:hidden px-4 py-4">
        {filteredBooks?.length > 0 ? (
          <ul>
            {filteredBooks?.map((book) => (
              <div className="flex flex-row gap-4 mb-4 p-2 border-b">
                <div className="book-img mr-2 pt-1 flex-shrink-0">
                 <Link to={`/book/${book?._id}`}>
                  <img className="size-20 rounded-md" src={book.imgurl} alt={book.name} />
                  </Link>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{book.name}</h3>
                  <p className="text-gray-600">by {book?.author}</p>
                  <span className="text-lg font-medium text-gray-800">
                    Rs. {book.discountedPrice}
                  </span>
                  <span className="ml-2 line-through text-gray-500">
                    Rs. {book.originalPrice}
                  </span>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center mt-4">No books available</p>
        )}
      </div>

      <div className="hidden md:flex flex-row">
        <div className="filter-container w-[20%] p-4 border-r mr-4 bg-gray-100">
          {/* Categories */}
          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-2">Categories</h1>
            {bookFilters?.categories?.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label className="cursor-pointer hover:text-gray-800 transition">
                  {category}
                </label>
              </div>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-2">Price Range</h1>
            <Slider
              range
              min={bookFilters?.price?.[0] || 0}
              max={bookFilters?.price?.[1] || 1000}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
            />
            <div className="flex justify-between mt-2 text-gray-700 font-medium">
              <span>Rs. {priceRange[0]}</span>
              <span>Rs. {priceRange[1]}</span>
            </div>
          </div>

          {/* Authors */}
          <div>
            <h1 className="text-lg font-semibold mb-2">Authors</h1>
            {bookFilters?.authors?.map((author) => (
              <div key={author} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAuthors.includes(author)}
                  onChange={() => handleAuthorChange(author)}
                />
                <span
                  className="truncate max-w-[150px] block text-gray-700 hover:text-gray-900 transition"
                  title={author}
                >
                  {author.length > 20 ? author.slice(0, 20) + "..." : author}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Books Section */}
        <div className="filter-books-container w-[75%] py-4">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="book-image">
                    <Link to={`/book/${book?._id}`}>
                      <img
                        className="w-24 h-32 hover:scale-105 transition-transform"
                        src={book.imgurl}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {book.name}
                    </h3>
                    <h3 className="text-gray-600 text-sm line-clamp-1">
                      by {book?.author}
                    </h3>
                    <span className="text-lg font-medium text-gray-800">
                      Rs. {book.discountedPrice}
                    </span>
                    <span className="ml-2 line-through text-gray-500">
                      Rs. {book.originalPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-4">No books available</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Search
