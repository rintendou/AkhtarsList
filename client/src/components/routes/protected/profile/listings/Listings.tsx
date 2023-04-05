import useProfile from "../../../../../lib/hooks/useProfile"

import ListingCard from "../../../../ui/ListingCard"

const Listings = () => {
  const { listings } = useProfile()

  return (
    <div>
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Listings</h1>
      <ul className="flex gap-8 py-8 overflow-x-auto">
        {listings.length !== 0 ? (
          listings.map((listing) => (
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
          <h1 className="text-2xl font-semibold">No Listings Found!</h1>
        )}
      </ul>
    </div>
  )
}

export default Listings
