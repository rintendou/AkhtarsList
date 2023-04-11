import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../lib/hooks/useAuth"

// Components
import Card from "./Card"

// Util functions
import getTimeRemaining from "../../lib/util/getTimeRemaining"

// Types
import ListingType from "../../lib/types/ListingType"

const ListingCard = ({ listing }: { listing: ListingType }) => {
  const navigate = useNavigate()
  const { auth } = useAuth()

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
    height,
    width,
    length,
  } = listing

  const handleClick = () => {
    navigate(`/listings/${_id}`, {
      state: {
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
        height,
        width,
        length,
      },
    })
  }

  const isLister = lister === auth._id

  const timeRemaining = getTimeRemaining(expireAt)
  const isExpired = timeRemaining === "Expired"

  return (
    <Card twClasses="p-2 w-56 text-sm h-76 justify-between cursor-pointer hover:shadow-xl duration-100 ease-in-out">
      <div
        className={`flex flex-col gap-1 ${isExpired && "opacity-30"}`}
        onClick={handleClick}
      >
        <img
          src="https://picsum.photos/200/300"
          alt={title}
          className="h-36 w-auto rounded-md"
        />
        <h1 className="text-lg font-light whitespace-nowrap truncate">
          {title}
        </h1>
        <p className="text-gray-500">Current Price:</p>
        <div className="flex justify-between">
          <p className="font-bold text-2xl">${finalPrice}</p>

          {isLister && (
            <p className="bg-black text-white p-1 rounded-md">Owned by you</p>
          )}
        </div>
        <div className="flex justify-between">
          <p className="bg-gray-200 p-1 rounded-md whitespace-nowrap">
            Views: {views}
          </p>
          <p className="bg-gray-200 p-1 rounded-md whitespace-nowrap">
            {category}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="bg-gray-200 p-1 rounded md whitespace-nowrap truncate w-full text-center">
            {timeRemaining}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default ListingCard
