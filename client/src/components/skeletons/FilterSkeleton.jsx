import React from 'react';

const FilterSkeleton = () => (
  <div className="w-[20%] p-4 border-r mr-4 bg-gray-100 hidden md:block">
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
          {[...Array(4)].map((_, j) => (
            <div key={j} className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-3 w-24 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default FilterSkeleton;
