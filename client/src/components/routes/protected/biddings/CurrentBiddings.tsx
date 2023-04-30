// Hooks
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"

// Components
import ListingCard from "../../../ui/ListingCard"
import BidMore from "./BidMore"

const CurrentBiddings = () => {
  const { biddings } = useProfileContext()

  const currentActiveBiddings = biddings.filter(
    (bidding) => new Date(bidding.expireAt) > new Date()
  )

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Current Active Biddings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {currentActiveBiddings.length !== 0 ? (
          currentActiveBiddings.map((bidding) => (
            <li key={bidding._id}>
              <ListingCard listing={bidding} />
            </li>
          ))
        ) : (
          <BidMore />
        )}
      </ul>
    </div>
  )
}

export default CurrentBiddings
