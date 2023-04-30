// Hooks
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"

// Components
import ListingCard from "../../../ui/ListingCard"
import BidMore from "./BidMore"

const FulfilledBiddings = () => {
  const { biddings } = useProfileContext()

  const fulfilledBiddings = biddings.filter(
    (bidding) => bidding.status === "sold"
  )

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Fulfilled Biddings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {fulfilledBiddings.length !== 0 ? (
          fulfilledBiddings.map((bidding) => (
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

export default FulfilledBiddings
