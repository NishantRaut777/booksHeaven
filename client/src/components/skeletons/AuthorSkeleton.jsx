// components/AuthorSkeleton.jsx
import React from 'react';

const AuthorSkeleton = () => {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="w-28 h-28 md:w-52 md:h-56 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="w-20 md:w-32 h-4 bg-gray-300 rounded mt-3 animate-pulse"></div>
    </div>
  );
};

export default AuthorSkeleton;
