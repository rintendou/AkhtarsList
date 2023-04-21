import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ListingCard from "../../../ui/ListingCard"
import ListMore from "./ListMore"

const ListingsToFulfill = () => {
  const { listings } = useProfileContext()

  const listingsToFullfill = listings.filter(
    (listing) => new Date(listing.expireAt) < new Date() && listing.bestBidder
  )

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Listings to Fulfill
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {listingsToFullfill.length !== 0 ? (
          listingsToFullfill.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))
        ) : (
          <ListMore />
        )}
      </ul>
    </div>
  )
}

export default ListingsToFulfill
