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

const SeeOthersButton = () => {
  return (
    <div className="flex gap-3 items-center text-tertiary">
      <RouterLink
        to={to}
        routerLinkText="See All"
        twClasses="whitespace-nowrap"
      />
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
      </svg>
    </div>
  )
}

export default SeeOtherListings
