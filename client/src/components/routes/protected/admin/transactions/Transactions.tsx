import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import ListingCard from "../../../../ui/ListingCard"
import TransactionsReport from "./TransactionsReport"

const Transactions = () => {
  const { expiredListings } = useTimelineContext()

  const transactions = expiredListings.filter(
    (listing) => listing.status === "sold"
  )
  return (
    <div className="flex flex-col w-full p-5 gap-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Transactions
      </h1>
      <TransactionsReport />
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
    </div>
  )
}

export default Transactions
