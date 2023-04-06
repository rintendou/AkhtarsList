import useTimeline from "../../../lib/hooks/useTimeline"

// Components
import ListingCardSkeleton from "../../ui/ListingCardSkeleton"
import ListingCard from "../../ui/ListingCard"
import SeeOthersButton from "./SeeOthersButton"

// Types
import ListingType from "../../../lib/types/ListingType"
import ListMore from "../protected/profile/listings/ListMore"

type Props = {
  category: string
  idToFilter: string
}

const SeeOtherListings = ({ category, idToFilter }: Props) => {
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
              <ListingCard
                _id={listing._id}
                image={listing.image}
                title={listing.title}
                finalPrice={listing.finalPrice}
                expireAt={listing.expireAt}
                views={listing.views}
                bidders={listing.bidders}
                lister={listing.lister}
                desc={listing.desc}
                startPrice={listing.startPrice}
                category={listing.category}
                weight={listing.weight}
                height={listing.height}
                width={listing.width}
                length={listing.length}
              />
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
