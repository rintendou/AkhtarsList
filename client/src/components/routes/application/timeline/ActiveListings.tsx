import useTimelineContext from "../../../../lib/hooks/context-hooks/useTimelineContext"

import ListingCard from "../../../ui/ListingCard"
import ListingSkeletons from "../../../ui/ListingSkeletons"
import SeeAll from "./SeeAll"

const ActiveListings = () => {
  const { unexpiredListings } = useTimelineContext()

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold w-full">All Active Listings</h1>
        <SeeAll to="/category/assorted" />
      </div>
      <ul className="flex gap-8 py-5 overflow-x-auto">
        {unexpiredListings.length !== 0 ? (
          unexpiredListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))
        ) : (
          <ListingSkeletons />
        )}
      </ul>
    </div>
  )
}

export default ActiveListings
