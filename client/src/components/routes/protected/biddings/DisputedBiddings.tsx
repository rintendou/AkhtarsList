import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ListingCard from "../../../ui/ListingCard"
import BidMore from "./BidMore"

const DisputedBiddings = () => {
  const { biddings } = useProfileContext()

  const disputedBiddings = biddings.filter(
    (bidding) =>
      new Date(bidding.expireAt) < new Date() && bidding.status === "disputed"
  )

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Disputed Biddings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {disputedBiddings.length !== 0 ? (
          disputedBiddings.map((bidding) => (
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

export default DisputedBiddings
