// Components
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"
import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"
import Status from "../../ui/Status"
import Bidders from "./Bidders"
import ReportListing from "./ReportListing"

import Transactions from "./Transactions"
import ListerActions from "./expired-listing-actions/ListerActions"
import WinnerActions from "./expired-listing-actions/WinnerActions"

const ExpiredBiddingSection = () => {
  const { data } = useListingDetailContextQuery()
  const { data: listing } = data
  const { finalPrice, lister, bestBidder, status } = listing
  const { auth } = useAuthContext()

  const isLister = lister === auth._id
  const isWinner = listing.bestBidder === auth._id

  return (
    <div
      className={`flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100 bg-opacity-40 select-none dark:bg-secondary`}
    >
      <h1 className="text-5xl text-center font-semibold  opacity-40">
        Listing Expired
      </h1>

      {isWinner && <WinnerActions />}
      {isLister && bestBidder && <ListerActions />}
      <Status status={status} />

      <h1 className="text-5xl text-center font-semibold backdrop-opacity-30 opacity-40">
        Biddings
      </h1>

      <div className="flex justify-between w-full opacity-40">
        <div className="flex items-center gap-3">
          <h1>Final Price:</h1>
          <p className="text-lg font-semibold"> ${finalPrice}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold truncate">Expired</p>
        </div>
      </div>

      {isLister ? (
        <div className="opacity-40">
          <h1 className="text-3xl font-semibold">You own this listing</h1>
          <h1 className="text-xs font-light text-gray-500 tracking-widest line-through text-center cursor-not-allowed duration-200 ease-in-out hover:font-semibold uppercase">
            Cannot Edit Expired Listing
          </h1>
        </div>
      ) : (
        <h1 className="text-3xl font-semibold text-center opacity-40">
          Bidding has finished
        </h1>
      )}

      <ReportListing />

      <div className="w-full flex gap-5 opacity-40">
        <Bidders />
        <Transactions />
      </div>
    </div>
  )
}

export default ExpiredBiddingSection
