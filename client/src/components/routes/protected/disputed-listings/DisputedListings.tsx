import useProfile from "../../../../lib/hooks/useProfile"
import ListingCard from "../../../ui/ListingCard"

const DisputedListings = () => {
  const { disputedListings } = useProfile()

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ul className="flex gap-8 py-8 overflow-x-auto">
        {disputedListings.length !== 0 &&
          disputedListings.map((disputedListing) => (
            <li key={disputedListing._id}>
              <ListingCard
                _id={disputedListing._id}
                image={disputedListing.image}
                title={disputedListing.title}
                finalPrice={disputedListing.finalPrice}
                expireAt={disputedListing.expireAt}
                views={disputedListing.views}
                bidders={disputedListing.bidders}
                lister={disputedListing.lister}
                desc={disputedListing.desc}
                startPrice={disputedListing.startPrice}
                category={disputedListing.category}
                weight={disputedListing.weight}
                dimensions={disputedListing.dimensions}
                height={disputedListing.height}
                width={disputedListing.width}
                length={disputedListing.length}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DisputedListings
