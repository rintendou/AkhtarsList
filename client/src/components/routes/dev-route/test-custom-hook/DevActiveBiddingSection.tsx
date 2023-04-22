import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../../../lib/hooks/context-hooks/useAuthContext"

// Components

// Utility functions
import numberInputIsValid from "../../../../lib/util/functions/numberInputValidator"

// Backend port number
import ListingType from "../../../../lib/types/ListingType"
import DevCountdown from "./DevCountdown"
import EditListing from "../test-nonpolled/EditListing"
import Error from "../../../ui/Error"
import Bidders from "../test-nonpolled/Bidders"
import TimeRemainingType from "../../../../lib/types/TimeRemainingType"

type Props = {
  bidders: string[]
  expireAt: Date
  finalPrice: number
  isLister: boolean
  listing: ListingType
  timeRemaining: TimeRemainingType
}

const ActiveBiddingSection = ({
  bidders,
  expireAt,
  finalPrice,
  isLister,
  listing,
  timeRemaining,
}: Props) => {
  const bidAmountRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const { auth } = useAuth()
  const navigate = useNavigate()

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
      return
    }

    if (Number(bidAmount) <= finalPrice) {
      setErrorMessage(
        "Bid amount cannot be less than or equal to the current price!"
      )
      return
    }

    const submitBid = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/THISAPICALLWILLFAIL`
      )
      const json = await response.json()

      if (!json.ok) {
        setErrorMessage(json.message)
        return
      }

      setErrorMessage("")
    }

    submitBid()
  }

  useEffect(() => {
    if (!bidAmountRef.current) {
      return
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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
          <DevCountdown timeRemaining={timeRemaining} />
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
          <EditListing />
        </div>
      )}

      {errorMessage && <Error errorMessage={errorMessage} />}
      <Bidders />
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
