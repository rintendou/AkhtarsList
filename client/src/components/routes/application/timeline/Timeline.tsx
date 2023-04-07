import AllListings from "./AllListings"
import CategoryListings from "./CategoryListings"
import ExpiredListings from "./ExpiredListings"
import TrendingListings from "./TrendingListings"

const Timeline = () => {
  return (
    <>
      <TrendingListings />
      <CategoryListings />
      <AllListings />
      <ExpiredListings />
    </>
  )
}

export default Timeline
