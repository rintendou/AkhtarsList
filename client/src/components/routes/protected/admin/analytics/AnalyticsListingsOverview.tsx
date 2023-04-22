import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import Card from "../../../../ui/Card"

const AnalyticsListingsOverview = () => {
  const { allListings, expiredListings, unexpiredListings } =
    useTimelineContext()

  const transactions = expiredListings.filter(
    (listing) =>
      (listing.status === "expired" && listing.bestBidder) ||
      listing.status === "sold"
  )

  const successfulTransactions = expiredListings.filter(
    (listing) => listing.status === "sold"
  )

  const pendingTransactions = expiredListings.filter(
    (listing) => listing.bestBidder && listing.status === "expired"
  )

  const disputedListings = expiredListings.filter(
    (listing) => listing.status === "disputed"
  )

  return (
    <Card twClasses="w-full p-4 h-full shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Listings</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Total Listings: {allListings.length}</p>
          <p className="text-xs text-gray-600">
            - Active Listings: {unexpiredListings.length}
          </p>
          <p className="text-xs text-gray-600">
            - Expired Listings: {expiredListings.length}
          </p>
        </div>
        <div className="space-y-2">
          <p>Total Transactions: {transactions.length}</p>
          <p className="text-xs text-gray-600">
            - Successful Transactions: {successfulTransactions.length}
          </p>
          <p className="text-xs text-gray-600">
            - Pending Transactions: {pendingTransactions.length}
          </p>
        </div>
        <p>Total Disputes: {disputedListings.length}</p>
      </div>
    </Card>
  )
}

export default AnalyticsListingsOverview
