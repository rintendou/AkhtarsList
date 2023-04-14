import { useListingDetailContextQuery } from "./ListingDetailContext"

const Transactions = () => {
  const { data, isLister } = useListingDetailContextQuery()
  const { data: listing } = data
  const { transactions } = listing

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-semibold">Transactions</h1>
      <div className="space-y-5 w-full overflow-y-auto h-96 border-2 p-4 border-secondary rounded-md">
        <div className="flex items-center space-x-4">
          <h1>Number of Transactions: </h1>
          <p className="text-lg font-semibold">{transactions.length}</p>
        </div>

        <ul>
          {transactions.length !== 0 && (
            <div className="flex items-center gap-3"></div>
          )}
          {transactions.length !== 0 ? (
            transactions.map((transaction: string, index: number) => (
              <li key={index} className="gap-3">
                - {transaction}
              </li>
            ))
          ) : (
            <div className="text-center">
              <h1 className="font-semibold text-lg">No Transactions yet!</h1>
              {isLister ? (
                <p className="text-sm">Waiting for other users to bid!</p>
              ) : (
                <p className="text-sm">Be the first one to bid!</p>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Transactions
