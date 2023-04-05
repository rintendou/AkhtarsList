import AllListings from "./AllListings"
import CategoryListings from "./CategoryListings"
import TrendingListings from "./TrendingListings"

const Timeline = () => {
  return (
    <>
      <TrendingListings />
      <CategoryListings />
      <AllListings />
    </>
  )
}

export default Timeline
