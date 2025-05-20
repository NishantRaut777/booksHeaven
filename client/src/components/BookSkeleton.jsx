import React from 'react';

const BookSkeleton = () => {
  return (
    <div className="w-[160px] md:w-[200px] h-[300px] bg-gray-200 animate-pulse rounded-lg p-2 m-2 flex-shrink-0">
      <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default BookSkeleton;
