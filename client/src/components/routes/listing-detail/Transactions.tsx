import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"
import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"

const Transactions = () => {
  const { data } = useListingDetailContextQuery()
  const { data: listing } = data
  const { transactions, lister } = listing
  const { auth } = useAuthContext()

  const isLister = lister === auth._id

  return (
    <div className="w-full">
      <div className="space-y-5 w-full overflow-y-auto h-96 border-2 border-secondary rounded-md dark:bg-black dark:border-tertiary">
        <div className="flex items-center space-x-4 text-primary bg-secondary dark:bg-black p-4 dark:border-b-2 dark:border-tertiary">
          <h1>Transactions: </h1>
          <p className="text-lg font-semibold">{transactions.length}</p>
        </div>

        <ul className="p-2">
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
