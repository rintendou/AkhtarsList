import useProfile from "../../../../lib/hooks/useProfile"
import ListingCard from "../../../ui/ListingCard"

const WonListings = () => {
  const { wonListings } = useProfile()

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ul className="flex gap-8 py-8 overflow-x-auto">
        {wonListings.length !== 0 &&
          wonListings.map((wonListing) => (
            <li key={wonListing._id}>
              <ListingCard
                _id={wonListing._id}
                image={wonListing.image}
                title={wonListing.title}
                finalPrice={wonListing.finalPrice}
                expireAt={wonListing.expireAt}
                views={wonListing.views}
                bidders={wonListing.bidders}
                lister={wonListing.lister}
                desc={wonListing.desc}
                startPrice={wonListing.startPrice}
                category={wonListing.category}
                weight={wonListing.weight}
                dimensions={wonListing.dimensions}
                height={wonListing.height}
                width={wonListing.width}
                length={wonListing.length}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default WonListings
