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
  } = useTimeline()
  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold w-full">Sneakers</h1>
          <SeeAll to="/category/sneakers" />
        </div>
        <ul className="flex gap-8 py-5 overflow-x-scroll">
          {sneakersListings.length !== 0 ? (
            sneakersListings.map((listing) => (
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
                  height={listing.height}
                  width={listing.width}
                  length={listing.length}
                />
              </li>
            ))
          ) : (
            <ListingSkeletons />
          )}
        </ul>
      </div>

      <div>
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold w-full">Antiques</h1>
          <SeeAll to="/category/antiques" />
        </div>
        <ul className="flex gap-8 py-5 overflow-x-scroll">
          {antiquesListings.length !== 0 ? (
            antiquesListings.map((listing) => (
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
                  height={listing.height}
                  width={listing.width}
                  length={listing.length}
                />
              </li>
            ))
          ) : (
            <ListingSkeletons />
          )}
        </ul>
      </div>

      <div className="py-14">
        <Carousel images={IMAGESET2} />
      </div>

      <div>
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold w-full">Tech</h1>
          <SeeAll to="/category/tech" />
        </div>
        <ul className="flex gap-8 py-5 overflow-x-scroll">
          {techListings.length !== 0 ? (
            techListings.map((listing) => (
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
                  height={listing.height}
                  width={listing.width}
                  length={listing.length}
                />
              </li>
            ))
          ) : (
            <ListingSkeletons />
          )}
        </ul>
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold w-full">Accessories</h1>
          <SeeAll to="/category/accessories" />
        </div>
        <ul className="flex gap-8 py-5 overflow-x-scroll">
          {accessoriesListings.length !== 0 ? (
            accessoriesListings.map((listing) => (
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
                  height={listing.height}
                  width={listing.width}
                  length={listing.length}
                />
              </li>
            ))
          ) : (
            <ListingSkeletons />
          )}
        </ul>
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold w-full">Collectibles</h1>
          <SeeAll to="/category/collectibles" />
        </div>
        <ul className="flex gap-8 py-5 overflow-x-scroll">
          {collectiblesListings.length !== 0 ? (
            collectiblesListings.map((listing) => (
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
                  height={listing.height}
                  width={listing.width}
                  length={listing.length}
                />
              </li>
            ))
          ) : (
            <ListingSkeletons />
          )}
        </ul>
      </div>
    </div>
  )
}

export default CategoryListings
