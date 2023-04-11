import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useTimeline from "../../../lib/hooks/useTimeline"

// Components
import SideNavLinks from "./SideNavLinks"
import ListingCard from "../../ui/ListingCard"

// Types
import ListingType from "../../../lib/types/ListingType"
import ListMore from "../protected/profile/listings/ListMore"
import SortBy from "../../ui/SortBy"

const Category = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  const { categoryName } = useParams()
  const {
    unexpiredListings,
    trendingListings,
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
    allListings,
  } = useTimeline()

  let activeCategorizedListings: ListingType[] = []

  switch (categoryName) {
    case "sneakers":
      activeCategorizedListings = sneakersListings
      break
    case "antiques":
      activeCategorizedListings = antiquesListings
      break
    case "tech":
      activeCategorizedListings = techListings
      break
    case "accessories":
      activeCategorizedListings = accessoriesListings
      break
    case "collectibles":
      activeCategorizedListings = collectiblesListings
      break
    case "trending":
      activeCategorizedListings = trendingListings
      break
    case "assorted":
      activeCategorizedListings = unexpiredListings
      break
  }

  const expiredCategorizedListings: ListingType[] = allListings.filter(
    (listing) => new Date(listing.expireAt) < new Date()
  )

  return (
    <div className="min-h-screen flex flex-col container mx-auto py-5">
      <div className="px-10 py-10 bg-purple-100 rounded-md shadow-md">
        <h1 className="text-3xl capitalize font-bold">{categoryName}</h1>
      </div>
      <div className="flex space-x-10">
        <SideNavLinks />

        <div>
          <div className="space-y-10 py-10 mb-10 border-b-2 border-secondary">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold capitalize">
                Active {categoryName} listings
              </h1>
              <SortBy
                options={[
                  { label: "23", value: "23" },
                  { label: "34", value: "34" },
                ]}
                onSelect={() => {}}
              />
            </div>
            <ul className="flex gap-8 justify-between py-5 flex-wrap">
              {activeCategorizedListings.length !== 0 ? (
                activeCategorizedListings.map((listing) => (
                  <li key={listing._id}>
                    <ListingCard listing={listing} />
                  </li>
                ))
              ) : (
                <ListMore />
              )}
            </ul>
          </div>

          <div className="space-y-10 py-10">
            <h1 className="text-2xl font-semibold capitalize">
              Expired {categoryName} listings
            </h1>
            <ul className="flex gap-8 justify-between py-5 flex-wrap">
              {expiredCategorizedListings.length !== 0 &&
                expiredCategorizedListings.map((listing) => (
                  <li key={listing._id}>
                    <ListingCard listing={listing} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
