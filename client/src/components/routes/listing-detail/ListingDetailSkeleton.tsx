import React from "react"

const ListingDetailSkeleton = () => {
  return (
    <div>
      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center justify-between">
        <div className="space-y-10">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-[400px] bg-gray-300 rounded w-full"></div>
        </div>
        <div className="space-y-10 w-full">
          <div className="space-y-5 w-full pb-10 border-b border-gray-300">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="pb-10 border-b border-b-gray-300">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-[200px] bg-gray-300 rounded w-full"></div>
          </div>
          <div className="flex flex-col xl:flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded w-1/4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100">
        <div className="h-10 bg-gray-300 rounded w-3/4"></div>
        <div className="flex flex-col md:flex-row justify-between text-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-3/4"></div>
        <div className="w-full flex flex-col md:flex-row gap-5 items-center">
          <div className="w-full max-w-[50%]">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <label
              htmlFor="Bid Amount ($)"
              className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary"
            >
              Bid Amount ($)
            </label>
          </div>
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetailSkeleton
