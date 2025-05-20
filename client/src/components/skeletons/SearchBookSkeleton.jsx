import React from 'react'

const SearchBookSkeleton = () => {
  return (
    <div className="w-[100%] py-4 mx-2">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center p-2 border rounded-lg shadow-sm animate-pulse"
        >
          <div className="w-24 h-32 bg-gray-300 rounded mb-3" />
          <div className="h-4 w-28 bg-gray-300 rounded mb-1" />
          <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  </div>
  )
}

export default SearchBookSkeleton
