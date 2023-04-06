import { useParams } from "react-router-dom"

import SideNavLinks from "./SideNavLinks"
import useTimeline from "../../../lib/hooks/useTimeline"
import ListingCard from "../../ui/ListingCard"

type ListingType = {
  _id: string
  image: string
  bidders: UserType[]
  lister: UserType
  title: string
  desc: string
  startPrice: number
  finalPrice: number
  expireAt: Date
  views: number
  category: string
  weight: number
  dimensions: [height: number, width: number, length: number]
}

const Category = () => {
  const { categoryName } = useParams()
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

  switch (categoryName) {
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
    <div className="min-h-screen flex flex-col container mx-auto py-5">
      <div className="px-10 py-10 bg-purple-100 rounded-md shadow-md">
        <h1 className="text-3xl capitalize font-bold">{categoryName}</h1>
      </div>
      <div className="flex space-x-10">
        <SideNavLinks />

        <div>
          <ul className="flex justify-around gap-8 py-5 flex-wrap">
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
              <h1>No Listings Found with Category: {categoryName}</h1>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Category
