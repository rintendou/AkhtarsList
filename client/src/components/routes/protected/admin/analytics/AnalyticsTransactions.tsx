import { Link } from "react-router-dom"
import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import Card from "../../../../ui/Card"
import ListingCard from "../../../../ui/ListingCard"
import SeeAll from "../../../application/timeline/SeeAll"

const AnalyticsTransactions = () => {
  const { expiredListings } = useTimelineContext()

  const transactions = expiredListings.filter(
    (listing) => listing.status === "sold"
  )

  return (
    <Card twClasses="w-full p-4 shadow-lg border-4 border-secondary space-y-4">
      <div className="flex justify-between align-middle">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <SeeAll to="/admin/transactions" />
      </div>
      <ul className="flex gap-8 py-8 overflow-x-auto px-8">
        {transactions.length !== 0 ? (
          transactions.map((transaction) => (
            <ListingCard listing={transaction}></ListingCard>
          ))
        ) : (
          <h1>No Transactions Found!</h1>
        )}
      </ul>
    </Card>
  )
}

export default AnalyticsTransactions
