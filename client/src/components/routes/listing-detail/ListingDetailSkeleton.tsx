const ListingDetailSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen border-b-2 animate-pulse">
      <div className="flex-auto p-10 py-24 flex flex-col items-center justify-between">
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-20"></div>
        <div className="h-[200px] bg-gray-300 rounded w-full"></div>
        <div className="space-y-5 w-full">
          <div className="space-y-5 w-full pb-5 border-b border-gray-300">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
          <div className="pb-5 border-b border-b-gray-300">
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
      <div className="flex-auto p-10 py-24 space-y-5 flex flex-col items-center bg-purple-100">
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
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="w-full flex flex-col md:flex-row gap-5 items-center">
          <div className="w-1/2">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="h-[600px] bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  )
}

export default ListingDetailSkeleton
