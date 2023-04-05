import useTimeline from "../../../../lib/hooks/useTimeline"
import ListingCard from "../../../ui/ListingCard"
import ListingSkeletons from "../../../ui/ListingSkeletons"

const CategoryListings = () => {
  const {
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
  } = useTimeline()
  return (
    <div>
      <h1 className="text-lg font-semibold w-full">Sneakers</h1>
      <ul className="flex gap-8 py-5 flex-wrap">
        {sneakersListings.length !== 0 ? (
          sneakersListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard
                _id={listing._id}
                img={listing.image}
                title={listing.title}
                price={listing.finalPrice}
                timeRemaining="10 days"
                views={listing.views}
              />
            </li>
          ))
        ) : (
          <ListingSkeletons />
        )}
      </ul>
      <h1 className="text-lg font-semibold w-full">Antiques</h1>
      <ul className="flex gap-8 py-5 flex-wrap">
        {antiquesListings.length !== 0 ? (
          antiquesListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard
                _id={listing._id}
                img={listing.image}
                title={listing.title}
                price={listing.finalPrice}
                timeRemaining="10 days"
                views={listing.views}
              />
            </li>
          ))
        ) : (
          <ListingSkeletons />
        )}
      </ul>
      <h1 className="text-lg font-semibold w-full">Tech</h1>
      <ul className="flex gap-8 py-5 flex-wrap">
        {techListings.length !== 0 ? (
          techListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard
                _id={listing._id}
                img={listing.image}
                title={listing.title}
                price={listing.finalPrice}
                timeRemaining="10 days"
                views={listing.views}
              />
            </li>
          ))
        ) : (
          <ListingSkeletons />
        )}
      </ul>
      <h1 className="text-lg font-semibold w-full">Accessories</h1>
      <ul className="flex gap-8 py-5 flex-wrap">
        {accessoriesListings.length !== 0 ? (
          accessoriesListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard
                _id={listing._id}
                img={listing.image}
                title={listing.title}
                price={listing.finalPrice}
                timeRemaining="10 days"
                views={listing.views}
              />
            </li>
          ))
        ) : (
          <ListingSkeletons />
        )}
      </ul>
      <h1 className="text-lg font-semibold w-full">Collectibles</h1>
      <ul className="flex gap-8 py-5 flex-wrap">
        {collectiblesListings.length !== 0 ? (
          collectiblesListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard
                _id={listing._id}
                img={listing.image}
                title={listing.title}
                price={listing.finalPrice}
                timeRemaining="10 days"
                views={listing.views}
              />
            </li>
          ))
        ) : (
          <ListingSkeletons />
        )}
      </ul>
    </div>
  )
}

export default CategoryListings
