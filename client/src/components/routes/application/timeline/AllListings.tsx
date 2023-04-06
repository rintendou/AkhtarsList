import useTimeline from "../../../../lib/hooks/useTimeline"

import ListingCard from "../../../ui/ListingCard"
import ListingSkeletons from "../../../ui/ListingSkeletons"
import SeeAll from "./SeeAll"

const AllListings = () => {
  const { allListings } = useTimeline()

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold w-full">All Listings</h1>
        <SeeAll to="/category/general" />
      </div>
      <ul className="flex gap-8 py-5 overflow-x-scroll">
        {allListings.length !== 0 ? (
          allListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard
                _id={listing._id}
                image={listing.image}
                title={listing.title}
                finalPrice={listing.finalPrice}
                expireAt={10}
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
          <ListingSkeletons />
        )}
      </ul>
    </div>
  )
}

export default AllListings
