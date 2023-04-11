import useTimeline from "../../../../lib/hooks/useTimeline"
import Carousel from "../../../ui/Carousel"
import ListingCard from "../../../ui/ListingCard"
import ListingSkeletons from "../../../ui/ListingSkeletons"
import SeeAll from "./SeeAll"

const IMAGESET2 = [
  "sneakers2.jpg",
  "antiques2.jpg",
  "tech2.jpg",
  "accessories2.jpg",
  "collectibles2.jpg",
  "assorted2.jpg",
]

const CategoryListings = () => {
  const {
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
    isLoading,
  } = useTimeline()
  return (
    <div className="space-y-8">
      {isLoading && <ListingSkeletons />}

      {sneakersListings.length !== 0 && (
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold w-full">Sneakers</h1>
            <SeeAll to="/category/sneakers" />
          </div>
          <ul className="flex gap-8 py-5 overflow-x-scroll">
            {sneakersListings.map((listing) => (
              <li key={listing._id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {antiquesListings.length !== 0 && (
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold w-full">Antiques</h1>
            <SeeAll to="/category/antiques" />
          </div>
          <ul className="flex gap-8 py-5 overflow-x-scroll">
            {antiquesListings.map((listing) => (
              <li key={listing._id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="py-14">
        <Carousel images={IMAGESET2} />
      </div>
      {techListings.length !== 0 && (
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold w-full">Tech</h1>
            <SeeAll to="/category/tech" />
          </div>
          <ul className="flex gap-8 py-5 overflow-x-scroll">
            {techListings.map((listing) => (
              <li key={listing._id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {accessoriesListings.length !== 0 && (
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold w-full">Accessories</h1>
            <SeeAll to="/category/accessories" />
          </div>
          <ul className="flex gap-8 py-5 overflow-x-scroll">
            {accessoriesListings.map((listing) => (
              <li key={listing._id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {collectiblesListings.length !== 0 && (
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold w-full">Collectibles</h1>
            <SeeAll to="/category/collectibles" />
          </div>
          <ul className="flex gap-8 py-5 overflow-x-scroll">
            {collectiblesListings.map((listing) => (
              <li key={listing._id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoryListings
// {isLoading && <ListingSkeletons />}
