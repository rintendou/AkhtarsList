// Hooks
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"

// Components
import ListingCard from "../../../ui/ListingCard"
import ListMore from "./ListMore"

const AllListings = () => {
  const { listings } = useProfileContext()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        All Listings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {listings.length !== 0 ? (
          listings.map((listing) => (
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

export default AllListings
