// Components

// Types

import { useNavigate } from "react-router-dom"
import useTimeline from "../../../../lib/hooks/context-hooks/useTimelineContext"
import ListingType from "../../../../lib/types/ListingType"
import SeeOthersButton from "../test-nonpolled/SeeOthersButton"
import ListingCard from "../../../ui/ListingCard"
import ListMore from "../../protected/profile/listings/ListMore"
import useListingDetail from "./useListingDetail"

const DevSeeOtherListings = () => {
  const {
    allListings,
    trendingListings,
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
    fetchListingsByCategory,
  } = useTimeline()

  const { listing } = useListingDetail()
  const { _id: idToFilter, category } = listing

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
    fetchListingsByCategory(category)
    navigate(`/listings/${listing._id}`, {
      state: {
        id: listing._id,
        image: listing.image,
        bidders: listing.bidders,
        lister: listing.lister,
        desc: listing.desc,
        title: listing.title,
        startPrice: listing.startPrice,
        finalPrice: listing.finalPrice,
        expireAt: listing.expireAt,
        views: listing.views,
        category: listing.category,
        dimensions: listing.dimensions,
        weight: listing.weight,
        height: listing.height,
        width: listing.width,
        length: listing.length,
      },
    })
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

export default DevSeeOtherListings
