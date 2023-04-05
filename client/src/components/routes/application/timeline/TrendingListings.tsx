import useTimeline from "../../../../lib/hooks/useTimeline"

import ListingCard from "../../../ui/ListingCard"

const TrendingListings = () => {
  const { trendingListings } = useTimeline()

  return (
    <div>
      <h1 className="text-lg font-semibold w-full">Trending Listings</h1>
      <ul className="flex gap-8 py-5 flex-wrap">
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
          <h1 className="text-center text-2xl font-bold">No Listings Found!</h1>
        )}
      </ul>
    </div>
  )
}

export default TrendingListings
