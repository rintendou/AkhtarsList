import useProfile from "../../../../../lib/hooks/useProfile"

import ListingCard from "../../../../ui/ListingCard"
import ListMore from "./ListMore"

const Listings = () => {
  const { listings } = useProfile()

  return (
    <div>
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Listings</h1>
      <ul className="flex gap-8 py-8 overflow-x-auto">
        <ListMore />
        {listings.length !== 0 &&
          listings.map((listing) => (
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
          ))}
      </ul>
    </div>
  )
}

export default Listings
