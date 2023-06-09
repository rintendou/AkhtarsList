// Hooks
import { useNavigate } from "react-router-dom"
import useTimeline from "../../../lib/hooks/context-hooks/useTimelineContext"
import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"

// Components
import ListingCard from "../../ui/ListingCard"
import SeeOthersButton from "./SeeOthersButton"
import ListMore from "../protected/listings/ListMore"

// Types
import ListingType from "../../../lib/types/ListingType"

const SeeOtherListings = () => {
  const { data } = useListingDetailContextQuery()
  const { data: listing } = data
  const { _id: idToFilter, category } = listing

  const {
    allListings,
    trendingListings,
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
  } = useTimeline()

  let categorizedListings: ListingType[] = []

  switch (category.toLowerCase()) {
    case "sneakers":
      categorizedListings = sneakersListings
      break
    case "antiques":
      categorizedListings = antiquesListings
      break
    case "tech":
      categorizedListings = techListings
      break
    case "accessories":
      categorizedListings = accessoriesListings
      break
    case "collectibles":
      categorizedListings = collectiblesListings
      break
    case "trending":
      categorizedListings = trendingListings
      break
    case "assorted":
      categorizedListings = allListings
      break
  }

  const filteredAndCategorizedListings = categorizedListings.filter(
    (l) => l._id !== idToFilter
  )

  const navigate = useNavigate()

  const onListingClick = (listing: ListingType) => {
    navigate(`/listings/${listing._id}`)
  }

  return (
    <div className="mx-auto container my-10">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold w-full">
          See Other Listings in {category}
        </h1>
        <SeeOthersButton to={`/category/${category.toLowerCase()}`} />
      </div>
      <ul className="flex gap-8 py-5 overflow-x-scroll">
        {filteredAndCategorizedListings.length !== 0 ? (
          filteredAndCategorizedListings.map((listing) => (
            <li key={listing._id}>
              <div onClick={() => onListingClick(listing)}>
                <ListingCard listing={listing} />
              </div>
            </li>
          ))
        ) : (
          <div>
            <div>
              <h1>No Other Listings Found in {category}</h1>
            </div>
            <ListMore />
          </div>
        )}
      </ul>
    </div>
  )
}

export default SeeOtherListings
