import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import useTimelineContext from "../../../lib/hooks/context-hooks/useTimelineContext"

// Components
import SideNavLinks from "./SideNavLinks"
import ListingCard from "../../ui/ListingCard"

// Types
import ListingType from "../../../lib/types/ListingType"
import ListMore from "../protected/listings/ListMore"

const Category = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [pathname])

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
  } = useTimelineContext()

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

  let expiredCategorizedListings: ListingType[] = allListings.filter(
    (listing) =>
      new Date(listing.expireAt) < new Date() &&
      listing.category.toLowerCase() === categoryName!.toLowerCase()
  )

  if (categoryName === "assorted") {
    expiredCategorizedListings = allListings.filter(
      (listing) => new Date(listing.expireAt) < new Date()
    )
  }

  // const [sortedListings, setSortedListings] = useState<ListingType[]>(
  //   activeCategorizedListings
  // )

  // const onSort = (key: string, isAscending: boolean) => {
  //   activeCategorizedListings.sort((a, b) => {
  //     const valueA = a[key]
  //     const valueB = b[key]
  //     let comparison = 0

  //     if (valueA > valueB) {
  //       comparison = 1
  //     } else if (valueA < valueB) {
  //       comparison = -1
  //     }

  //     return isAscending ? comparison : comparison * -1
  //   })
  //   setSortedListings(sortedListings)
  // }

  return (
    <div className="min-h-screen flex flex-col container mx-auto py-5">
      <div className="px-10 py-10 bg-purple-100 rounded-md shadow-md dark:bg-black">
        <h1 className="text-3xl capitalize font-bold">{categoryName}</h1>
      </div>
      <div className="flex space-x-10">
        <SideNavLinks />

        <div className="w-full">
          <div className="space-y-10 py-10 mb-10 ">
            <div className="flex flex-col md:flex-row gap-5 justify-between">
              <h1 className="text-2xl font-semibold capitalize">
                Active {categoryName} listings
              </h1>
              {/* <CategoryActions onSort={onSort} /> */}
            </div>
            <ul className="flex gap-8 py-5 flex-wrap">
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
          {expiredCategorizedListings.length !== 0 && (
            <div className="w-full border-b-2 border-secondary dark:border-primary"></div>
          )}
          {categoryName !== "trending" &&
            expiredCategorizedListings.length !== 0 && (
              <div className="space-y-10 py-10">
                <h1 className="text-2xl font-semibold capitalize">
                  Expired {categoryName} listings
                </h1>
                <ul className="flex gap-8 py-5 flex-wrap">
                  {expiredCategorizedListings.length !== 0 &&
                    expiredCategorizedListings.map((listing) => (
                      <li key={listing._id}>
                        <ListingCard listing={listing} />
                      </li>
                    ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Category
