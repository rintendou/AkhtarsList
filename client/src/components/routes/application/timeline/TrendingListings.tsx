import useTimeline from "../../../../lib/hooks/useTimeline"

import ListingCard from "../../../ui/ListingCard"

const TrendingListings = () => {
  const { trendingListings } = useTimeline()

  return (
    <div>
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Listings</h1>
      <ul className="flex gap-8 py-8 overflow-x-auto">
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
