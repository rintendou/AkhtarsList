// Hooks
import useTimelineContext from "../../../../lib/hooks/context-hooks/useTimelineContext"

// Components
import ListingCard from "../../../ui/ListingCard"
import ListingSkeletons from "../../../ui/ListingSkeletons"
import SeeAll from "./SeeAll"

const TrendingListings = () => {
  const { trendingListings } = useTimelineContext()

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold w-full">Trending</h1>
        <SeeAll to="/category/trending" />
      </div>
      <ul className="flex gap-8 py-5 overflow-x-auto">
        {trendingListings.length !== 0 ? (
          trendingListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))
        ) : (
          <ListingSkeletons />
        )}
      </ul>
    </div>
  )
}

export default TrendingListings
