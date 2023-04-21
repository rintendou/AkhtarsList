import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ListingCard from "../../../ui/ListingCard"
import BidMore from "./BidMore"

const WonBiddings = () => {
  const { biddings } = useProfileContext()
  const { auth } = useAuthContext()

  const wonBiddings = biddings.filter(
    (bidding) =>
      new Date(bidding.expireAt) < new Date() && bidding.bestBidder === auth._id
  )

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Won Biddings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {wonBiddings.length !== 0 ? (
          wonBiddings.map((bidding) => (
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

export default WonBiddings
