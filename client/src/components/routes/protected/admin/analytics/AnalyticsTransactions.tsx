// Hooks
import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"

// Components
import Card from "../../../../ui/Card"
import ListingCard from "../../../../ui/ListingCard"
import SeeAll from "../../../application/timeline/SeeAll"

const AnalyticsTransactions = () => {
  const { expiredListings } = useTimelineContext()

  const transactions = expiredListings.filter(
    (listing) => listing.status === "sold"
  )

  return (
    <Card twClasses="w-full shadow-lg border-2 border-secondary dark:bg-black dark:border-tertiary">
      <div className="flex justify-between align-middle p-4 bg-secondary text-primary dark:bg-black dark:border-b-2 dark:border-tertiary">
        <h1 className="text-2xl font-semibold">Successful Transactions</h1>
        <SeeAll to="/admin/transactions" />
      </div>
      <ul className="flex gap-8 py-8 overflow-x-auto px-8">
        {transactions.length !== 0 ? (
          transactions.map((transaction) => (
            <li key={transaction._id}>
              <ListingCard listing={transaction}></ListingCard>
            </li>
          ))
        ) : (
          <h1>No Transactions Found!</h1>
        )}
      </ul>
    </Card>
  )
}

export default AnalyticsTransactions
