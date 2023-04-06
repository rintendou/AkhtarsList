import useTimeline from "../../../lib/hooks/useTimeline"
import SeeAll from "../application/timeline/SeeAll"

// Types
import ListingType from "../../../lib/types/ListingType"
import ListingCard from "../../ui/ListingCard"
import ListingCardSkeleton from "../../ui/ListingCardSkeleton"

type Props = {
  category: string
}

const SeeOtherListings = ({ category }: Props) => {
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

  return (
    <div className="mx-auto container my-10">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold w-full">
          See Other Listings in {category}
        </h1>
        <SeeAll to="/category/trending" />
      </div>
      <ul className="flex gap-8 py-5 overflow-x-scroll">
        {categorizedListings.length !== 0 ? (
          categorizedListings.map((listing) => (
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
                dimensions={listing.dimensions}
              />
            </li>
          ))
        ) : (
          <ListingCardSkeleton />
        )}
      </ul>
    </div>
  )
}

export default SeeOtherListings
