// Hooks
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"

// Components
import ListingCard from "../../../ui/ListingCard"
import ListMore from "./ListMore"

const UnsoldListings = () => {
  const { listings } = useProfileContext()

  const unsoldListings = listings.filter(
    (listing) => new Date(listing.expireAt) < new Date() && !listing.bestBidder
  )

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Unsold Listings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {unsoldListings.length !== 0 ? (
          unsoldListings.map((unsoldListing) => (
            <li key={unsoldListing._id}>
              <ListingCard listing={unsoldListing} />
            </li>
          ))
        ) : (
          <ListMore />
        )}
      </ul>
    </div>
  )
}

export default UnsoldListings
