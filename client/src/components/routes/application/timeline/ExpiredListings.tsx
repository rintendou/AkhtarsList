import useTimeline from "../../../../lib/hooks/useTimeline"

import ListingCard from "../../../ui/ListingCard"
import ListingSkeletons from "../../../ui/ListingSkeletons"
import SeeAll from "./SeeAll"

const ExpiredListings = () => {
  const { expiredListings } = useTimeline()

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold w-full">Expired Listings</h1>
        <SeeAll to="/category/general" />
      </div>
      <ul className="flex gap-8 py-5 overflow-x-scroll">
        {expiredListings.length !== 0 ? (
          expiredListings.map((listing) => (
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
  )
}

export default ExpiredListings
