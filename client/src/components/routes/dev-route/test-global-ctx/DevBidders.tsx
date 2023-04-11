import useListingDetail from "./useListingDetail"

const DevBidders = () => {
  const { isLister, bidders } = useListingDetail()

  return (
    <ul className="space-y-5 w-full overflow-y-scroll h-96 border-2 p-4 border-secondary rounded-md">
      {bidders.length !== 0 && (
        <div className="flex items-center gap-3">
          <h1>Number of Bidders: </h1>
          <p className="text-lg font-semibold">{bidders.length}</p>
        </div>
      )}
      {bidders.length !== 0 ? (
        bidders.map((bidder: string, index: number) => (
          <li key={index}>{bidder}</li>
        ))
      ) : isLister ? (
        <div className="text-center">
          <h1 className="font-semibold text-lg">No bidders yet!</h1>
          <p className="text-sm">Waiting for other users to bid!</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="font-semibold text-lg">No bidders yet!</h1>
          <p className="text-sm">Be the first one to bid!</p>
        </div>
      )}
    </ul>
  )
}

export default DevBidders
