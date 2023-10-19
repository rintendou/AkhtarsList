// Hooks
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"
import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"
import useProfileContext from "../../../lib/hooks/context-hooks/useProfileContext"

// Components
import Bidders from "./Bidders"
import Error from "../../ui/Error"
import Countdown from "../../ui/Countdown"
import EditListing from "./EditListing"
import Success from "../../ui/Success"
import Transactions from "./Transactions"
import CurrentBalance from "./CurrentBalance"
import ReportListing from "./ReportListing"

// Utility functions
import numberInputIsValid from "../../../lib/util/functions/numberInputValidator"
import getNumberWithCommas from "../../../lib/util/functions/getNumberWithCommas"

const ActiveBiddingSection = () => {
  const { data } = useListingDetailContextQuery()
  const { data: listing } = data
  const { _id: listingId, expireAt, finalPrice, lister, bestBidder } = listing

  const bidAmountRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { auth } = useAuthContext()
  const navigate = useNavigate()
  const { refetchUserDetails } = useProfileContext()

  const isLister = lister === auth._id

  useEffect(() => {
    if (!bidAmountRef.current) {
      return
    }

    bidAmountRef.current!.focus()
  }, [])

  const onSubmitBid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const bidAmount = bidAmountRef.current!.value

    if (!auth._id) {
      navigate("/login", {
        state: { errorMessage: "Must be logged in to do that!" },
      })
    }

    if (!numberInputIsValid(bidAmount)) {
      setErrorMessage("Invalid Input")
      bidAmountRef.current!.focus()
      return
    }

    if (Number(bidAmount) <= finalPrice) {
      setErrorMessage(
        "Bid amount cannot be less than or equal to the current price!"
      )
      bidAmountRef.current!.focus()
      return
    }

    const payload = {
      userId: auth._id,
      finalPrice: bidAmount,
      bestBidder: auth._id,
    }

    const submitBid = async () => {
      const response = await fetch(
        `https://rvyt24-${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }.csb.app/api/listing/bid/${listingId}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      )
      const json = await response.json()

      if (!json.ok) {
        setErrorMessage(json.message)
        setSuccessMessage("")
        bidAmountRef.current!.focus()
        return
      }

      setErrorMessage("")
      setSuccessMessage("You are currently the best bidder!")
      bidAmountRef.current!.value = ""
      bidAmountRef.current!.focus()
      refetchUserDetails()
    }

    submitBid()
  }

  return (
    <div
      className={`flex-auto p-10 py-12 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100 dark:bg-secondary`}
    >
      <h1 className="text-5xl text-center font-semibold backdrop-opacity-30 text-tertiary">
        Biddings
      </h1>

      <div className="flex flex-col md:flex-row justify-between text-center gap-10">
        <div className="flex items-center gap-3">
          <h1>Current Price:</h1>
          <p className="text-lg font-semibold">
            ${getNumberWithCommas(finalPrice)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <h1>Expires In:</h1>
          <Countdown targetDate={expireAt.toString()} />
        </div>
      </div>

      {!isLister ? (
        <>
          <form
            className="w-full flex flex-col md:flex-row gap-5 items-center"
            onSubmit={onSubmitBid}
          >
            <div className="w-full max-w-[50%] relative">
              <input
                id="Bid Amount ($)"
                ref={bidAmountRef}
                className="py-3 pl-3 p-2 block px-0 mt-0 bg-transparent border-2 focus:outline-none focus:ring-0 border-secondary rounded-md w-full dark:bg-black dark:text-primary dark:border-tertiary "
              />
              <label
                htmlFor="Bid Amount ($)"
                className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary dark:text-primary"
              >
                Bid Amount ($)
              </label>
            </div>
            <BidButton />
          </form>
          {auth.isAdmin && (
            <div>
              <h1 className="text-xl font-semibold w-full text-center">
                You are an admin
              </h1>
              <div className="flex gap-5 justify-center">
                <EditListing />
                <ReportListing />
              </div>
            </div>
          )}
          {!auth.isAdmin && <ReportListing />}
          <CurrentBalance />
        </>
      ) : (
        <div>
          <h1 className="text-xl font-semibold w-full text-center">
            You own this listing
          </h1>
          <EditListing />
        </div>
      )}

      {!errorMessage && successMessage && bestBidder === auth._id && (
        <Success successMessage={successMessage} />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
      <div className="w-full flex gap-5">
        <Bidders />
        <Transactions />
      </div>
    </div>
  )
}

const BidButton = () => {
  return (
    <button
      className={`p-4 py-3 rounded-lg duration-200 hover:bg-tertiary ease-in-out bg-secondary text-primary font-bold text-xl w-full max-w-[50%] dark:bg-tertiary dark:hover:bg-black focus:outline-none`}
      type="submit"
    >
      Place Bid
    </button>
  )
}

export default ActiveBiddingSection
