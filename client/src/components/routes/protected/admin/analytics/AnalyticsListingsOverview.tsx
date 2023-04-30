// Hooks
import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"

// Components
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
    <Card twClasses="w-full h-full shadow-lg border-secondary dark:bg-black border-2 dark:border-tertiary">
      <h1 className="text-2xl font-semibold p-4 bg-secondary dark:bg-black dark:border-b-2 dark:border-tertiary text-primary">
        Listings
      </h1>
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <p>Total Listings: {allListings.length}</p>
          <p className="text-xs text-gray-600 dark:text-primary">
            - Active Listings: {unexpiredListings.length}
          </p>
          <p className="text-xs text-gray-600 dark:text-primary">
            - Expired Listings: {expiredListings.length}
          </p>
        </div>
        <div className="space-y-2">
          <p>Total Transactions: {transactions.length}</p>
          <p className="text-xs text-gray-600 dark:text-primary">
            - Successful Transactions: {successfulTransactions.length}
          </p>
          <p className="text-xs text-gray-600 dark:text-primary">
            - Pending Transactions: {pendingTransactions.length}
          </p>
        </div>
        <p>Total Disputes: {disputedListings.length}</p>
      </div>
    </Card>
  )
}

export default AnalyticsListingsOverview
