import useProfile from "../../../../../lib/hooks/context-hooks/useProfileContext"

import ListingCard from "../../../../ui/ListingCard"
import ListMore from "./ListMore"

const Listings = () => {
  const { listings } = useProfile()

  return (
    <div>
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Listings</h1>
      <ul className="flex gap-8 py-8 overflow-x-auto">
        <ListMore />
        {listings.length !== 0 &&
          listings.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Listings
