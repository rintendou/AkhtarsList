import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ListingCard from "../../../ui/ListingCard"
import BidMore from "../profile/biddings/BidMore"

const WonBiddings = () => {
  const { disputedListings } = useProfileContext()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Won Biddings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {disputedListings.length !== 0 ? (
          disputedListings.map((disputedListing) => (
            <li key={disputedListing._id}>
              <ListingCard listing={disputedListing} />
            </li>
          ))
        ) : (
          <BidMore />
        )}
      </ul>
    </div>
  )
}

export default WonBiddings
