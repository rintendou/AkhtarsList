import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ListingCard from "../../../ui/ListingCard"
import ListMore from "./ListMore"

const SoldListings = () => {
  const { listings } = useProfileContext()

  const soldListings = listings.filter(
    (listing) =>
      new Date(listing.expireAt) < new Date() && listing.status === "sold"
  )

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Sold Listings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {soldListings.length !== 0 ? (
          soldListings.map((listing) => (
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

export default SoldListings
