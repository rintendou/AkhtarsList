import useProfile from "../../../../../lib/hooks/useProfile"

import ListingCard from "../../../../ui/ListingCard"

const Listings = () => {
  const { listings } = useProfile()
  console.log(listings)

  return (
    <div>
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Listings</h1>
      <ul className="flex flex-wrap gap-5 py-5 justify-center content-center">
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
          <h1>No Listings Found!</h1>
        )}
      </ul>
    </div>
  )
}

export default Listings
