import { useEffect, useRef, useState } from "react"

import DevCountdown from "./DevCountdown"
import EditListing from "../../listing-detail/EditListing"
import Error from "../../../ui/Error"
import Bidders from "../../listing-detail/Bidders"
import useListingDetail from "./useListingDetail"

const ActiveBiddingSection = () => {
  const bidAmountRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const { refetchListing, listing, timeRemaining, isLister } =
    useListingDetail()
  const { bidders, finalPrice } = listing

  const onSubmitBid = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("TEST")
    e.preventDefault()
    refetchListing()
  }
  console.log("TEST")

  useEffect(() => {
    bidAmountRef.current!.focus()
  }, [])

  return (
    <div
      className={`flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100`}
    >
      <h1 className="text-5xl text-center font-semibold backdrop-opacity-30">
        Biddings
      </h1>

      <div className="flex flex-col md:flex-row justify-between text-center gap-10">
        <div className="flex items-center gap-3">
          <h1>Current Price:</h1>
          <p className="text-lg font-semibold"> ${finalPrice}</p>
        </div>

        <div className="flex items-center gap-3">
          <h1>Expires In:</h1>
          <DevCountdown />
        </div>
      </div>

      {!isLister ? (
        <form
          className="w-full flex flex-col md:flex-row gap-5 items-center"
          onSubmit={onSubmitBid}
        >
          <div className="w-full max-w-[50%]">
            <input
              id="Bid Amount ($)"
              ref={bidAmountRef}
              className="pt-3 pl-3 p-2 block px-0 mt-0 bg-transparent border-2 focus:outline-none focus:ring-0 border-secondary rounded-md w-full"
            />
            <label
              htmlFor="Bid Amount ($)"
              className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary"
            >
              Bid Amount ($)
            </label>
          </div>
          <BidButton />
        </form>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold w-full text-center">
            You own this listing
          </h1>
          <EditListing listing={listing} />
        </div>
      )}

      {errorMessage && <Error errorMessage={errorMessage} />}
      <Bidders bidders={bidders} isLister={isLister} />
    </div>
  )
}

const BidButton = () => {
  return (
    <button
      className={`p-4 py-3 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-xl w-full max-w-[50%]`}
      type="submit"
    >
      Place Bid
    </button>
  )
}

export default ActiveBiddingSection
