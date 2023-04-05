import useTimeline from "../../../../lib/hooks/useTimeline"

import ListingCard from "../../../ui/ListingCard"
import ListingSkeletons from "../../../ui/ListingSkeletons"
import SeeAll from "./SeeAll"

const TrendingListings = () => {
  const { trendingListings } = useTimeline()

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold w-full">Trending</h1>
        <SeeAll to="/category/trending" />
      </div>
      <ul className="flex gap-8 py-5 overflow-x-scroll">
        {trendingListings.length !== 0 ? (
          trendingListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard
                _id={listing._id}
                img={listing.image}
                title={listing.title}
                price={listing.finalPrice}
                timeRemaining="10 days"
                views={listing.views}
              />
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
