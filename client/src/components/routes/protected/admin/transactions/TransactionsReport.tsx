import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import Card from "../../../../ui/Card"

const TransactionsReport = () => {
  const { expiredListings } = useTimelineContext()

  const successfulTransactions = expiredListings.filter(
    (listing) => listing.status === "sold"
  )

  const totalPrice = successfulTransactions.reduce(
    (total, transaction) => (total += transaction.finalPrice),
    0
  )

  return (
    <Card twClasses="w-full p-4 h-64 shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Transactions Report</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Total Price of Transactions: ${totalPrice}</p>
          <p>Total Successful Transactions: {successfulTransactions.length}</p>
        </div>
      </div>
    </Card>
  )
}

export default TransactionsReport
