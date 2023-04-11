// Components
import useListingDetailContext from "../../../lib/hooks/useListingDetailContext"
import Bidders from "./Bidders"
import Transactions from "./Transactions"

const ExpiredBiddingSection = () => {
  const { listing, isLister } = useListingDetailContext()
  const { finalPrice } = listing

  return (
    <div
      className={`flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100 opacity-40 select-none`}
    >
      <h1 className="text-5xl text-center font-semibold opacity-100">
        Listing Expired
      </h1>

      <h1 className="text-5xl text-center font-semibold backdrop-opacity-30">
        Biddings
      </h1>

      <div className="flex justify-between w-full">
        <div className="flex items-center gap-3">
          <h1>Final Price:</h1>
          <p className="text-lg font-semibold"> ${finalPrice}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold truncate">Expired</p>
        </div>
      </div>

      {isLister ? (
        <div>
          <h1 className="text-3xl font-semibold">You own this listing</h1>
          <h1 className="text-xs font-light text-gray-500 tracking-widest line-through text-center cursor-not-allowed duration-200 ease-in-out hover:font-semibold uppercase">
            Cannot Edit Expired Listing
          </h1>
        </div>
      ) : (
        <h1 className="text-3xl font-semibold text-center">
          Bidding has finished
        </h1>
      )}

      <div className="w-full flex flex-col lg:flex-row gap-5">
        <Bidders />
        <Transactions />
      </div>
    </div>
  )
}

export default ExpiredBiddingSection
