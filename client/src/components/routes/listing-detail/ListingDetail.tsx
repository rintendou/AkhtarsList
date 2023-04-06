import { useState } from "react"
import useListingDetail from "../../../lib/hooks/useListingDetail"

import { settings } from "../../../settings"

import DUMMYIMAGE from "../../../../public/random-listing-image-undraw.svg"

import Bidders from "./Bidders"
import { useLocation } from "react-router"

const ListingDetail = () => {
  const [bidAmount, setBidAmount] = useState("0")
  const location = useLocation()

  const {
    _id,
    image,
    bidders,
    lister,
    desc,
    title,
    startPrice,
    finalPrice,
    expireAt,
    views,
    category,
    weight,
    dimensions,
  } = location.state

  const onSubmitBid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const submitBid = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/THISAPICALLWILLFAIL`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }
    }

    submitBid()
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center justify-between">
        <div className="space-y-10">
          <h1 className="text-3xl text-center font-semibold">{title}</h1>
          <img src={DUMMYIMAGE} alt={title} />
        </div>

        <div className="space-y-10 w-full">
          <div className="space-y-5 w-full pb-10 border-b border-gray-300">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h1>Lister: </h1>
                <p className="text-lg font-semibold">{lister}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h1>Start Price: </h1>
              <p className="text-lg font-semibold">${startPrice}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h1>Category:</h1>
                <p className="text-lg font-semibold">{category}</p>
              </div>
              <div className="flex items-center gap-3">
                <h1>Views:</h1>
                <p className="text-lg font-semibold">{views}</p>
              </div>
            </div>
          </div>

          <div className="pb-10 border-b border-b-gray-300">
            <h1>Description: </h1>
            <p className="font-semibold text-lg indent-10">{desc}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <h1>Weight:</h1>
              <p className="text-lg font-semibold">{weight} kg</p>
            </div>

            {/* <div className="flex gap-3 items-center">
              <h1>Dimensions: </h1>
              <div className="flex items-center gap-3">
                <h1>H:</h1>
                <p className="text-lg font-semibold">{dimensions[0]} cm </p>
              </div>
              <div className="flex items-center gap-3">
                <h1>L:</h1>
                <p className="text-lg font-semibold">{dimensions[1]} cm </p>
              </div>
              <div className="flex items-center gap-3">
                <h1>W:</h1>
                <p className="text-lg font-semibold">{dimensions[2]} cm </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100">
        <h1 className="text-3xl text-center font-semibold">Biddings</h1>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3">
            <h1>Current Price:</h1>
            <p className="text-lg font-semibold"> ${finalPrice}</p>
          </div>

          <div className="flex items-center gap-3">
            <h1>Expires At:</h1>
            <p className="text-lg font-semibold">{expireAt}</p>
          </div>
        </div>

        <form
          className="w-full flex flex-col md:flex-row gap-5 items-center"
          onSubmit={onSubmitBid}
        >
          <div className="w-full max-w-[50%]">
            <input
              id="Bid Amount ($)"
              placeholder=""
              value={bidAmount}
              onChange={(event) => setBidAmount(event.target.value)}
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
        {/* <Bidders /> */}
      </div>
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

export default ListingDetail
