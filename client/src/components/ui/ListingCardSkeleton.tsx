import Card from "./Card"

const ListingCardSkeleton = () => {
  return (
    <Card twClasses="p-2 w-56 h-76 flex flex-col justify-between cursor-not-allowed opacity-50 dark:bg-black">
      <div className="h-36 w-auto rounded-md bg-gray-400 animate-pulse mb-2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-400 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-400 rounded w-1/2 animate-pulse"></div>
        <div className="h-3 bg-gray-400 rounded w-2/3 animate-pulse"></div>
        <div className="h-3 bg-gray-400 rounded w-1/3 animate-pulse"></div>
        <div className="flex justify-between">
          <div className="bg-gray-400 p-1 rounded md  w-1/3  animate-pulse"></div>
          <div className="bg-gray-400 p-1 rounded md  w-1/3  animate-pulse"></div>
        </div>
      </div>
    </Card>
  )
}

export default ListingCardSkeleton
