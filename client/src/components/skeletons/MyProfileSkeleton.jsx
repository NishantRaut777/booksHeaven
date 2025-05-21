import React from 'react'

const MyProfileSkeleton = () => {
  return (
     <div className="animate-pulse px-6 py-4">
      {/* Section Title Skeleton */}
      <div className="w-32 h-5 bg-gray-300 rounded mb-4"></div>

      {/* Order List Skeletons */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border p-4 rounded-md mb-4 shadow-sm bg-gray-100"
        >
          <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/3 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-16 h-4 bg-gray-300 rounded mb-3"></div>

          {/* Order Item Skeleton */}
          <div className="flex gap-4 items-center bg-gray-200 p-3 rounded-sm">
            <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-3 bg-gray-300 rounded"></div>
              <div className="w-24 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyProfileSkeleton
