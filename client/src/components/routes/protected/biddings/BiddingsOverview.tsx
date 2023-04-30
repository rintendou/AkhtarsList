// Hooks
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"

// Components
import Card from "../../../ui/Card"

const BiddingsOverview = () => {
  const { biddings } = useProfileContext()
  const { auth } = useAuthContext()

  const activeBiddings = biddings.filter(
    (bidding) => new Date(bidding.expireAt) > new Date()
  )

  const expiredBiddings = biddings.filter(
    (bidding) => new Date(bidding.expireAt) < new Date()
  )

  const wonBiddings = biddings.filter(
    (bidding) =>
      new Date(bidding.expireAt) < new Date() && bidding.bestBidder === auth._id
  )

  const totalWonBiddingsAmount = wonBiddings.reduce(
    (total, bidding) => (total += bidding.finalPrice),
    0
  )

  const fulfilledBiddings = biddings.filter(
    (bidding) => bidding.status === "sold"
  )

  const totalFulfilledBiddingsAmount = fulfilledBiddings.reduce(
    (total, bidding) => (total += bidding.finalPrice),
    0
  )

  const pendingBiddings = biddings.filter(
    (bidding) =>
      new Date(bidding.expireAt) < new Date() &&
      bidding.bestBidder === auth._id &&
      bidding.status === "expired"
  )

  const totalPendingBiddingsAmount = pendingBiddings.reduce(
    (total, disputed) => (total += disputed.finalPrice),
    0
  )

  const disputedBiddings = biddings.filter(
    (bidding) =>
      new Date(bidding.expireAt) < new Date() && bidding.status === "disputed"
  )

  const totalDisputedBiddingsAmount = disputedBiddings.reduce(
    (total, disputed) => (total += disputed.finalPrice),
    0
  )

  return (
    <Card twClasses="w-full shadow-lg border-4 border-secondary dark:bg-black dark:border-4 dark:border-tertiary">
      <h1 className="text-2xl font-semibold bg-secondary dark:bg-black text-primary p-4 dark:border-b-4 dark:border-tertiary">
        Biddings Overview
      </h1>
      <div className="p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <p>Total Expired Expenditures: ${totalWonBiddingsAmount}</p>
          <p className="text-xs text-gray-600 dark:text-white">
            - Successful Bid Amount: ${totalFulfilledBiddingsAmount}
          </p>
          <p className="text-xs text-gray-600 dark:text-white">
            - Pending Bid Amount: ${totalPendingBiddingsAmount}
          </p>
          <p className="text-xs text-gray-600 dark:text-white">
            - Disputed Bid Amount: ${totalDisputedBiddingsAmount}
          </p>
        </div>
        <div className="space-y-2">
          <p>Total Bids: {biddings.length}</p>
          <p className="text-xs text-gray-600 dark:text-white">
            - Active Bids: {activeBiddings.length}
          </p>
          <p className="text-xs text-gray-600 dark:text-white">
            - Expired Bids: {expiredBiddings.length}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default BiddingsOverview
