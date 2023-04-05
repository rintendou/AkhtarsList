import useTimeline from "../../../../lib/hooks/useTimeline"
import AllListings from "./AllListings"
import TrendingListings from "./TrendingListings"

const Timeline = () => {
  return (
    <>
      <TrendingListings />
      <AllListings />
    </>
  )
}

export default Timeline