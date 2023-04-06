import { useNavigate } from "react-router-dom"
import useUpdateListingViewCount from "../../lib/hooks/useUpdateListingViewCount"

import Card from "./Card"

import getTimeRemaining from "../../lib/util/getTimeRemaining"

type UserType = {
  username: string
}

type ListingType = {
  _id: string
  image: string
  bidders: UserType[]
  lister: UserType
  title: string
  desc: string
  startPrice: number
  finalPrice: number
  expireAt: Date
  views: number
  category: string
  weight: number
  dimensions: [height: number, width: number, length: number]
}

const ListingCard = ({
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
}: ListingType) => {
  const navigate = useNavigate()
  const { updateListingViewCount } = useUpdateListingViewCount()

  const handleClick = () => {
    updateListingViewCount(_id)
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
        dimensions,
      },
    })
  }

  const timeRemaining = getTimeRemaining(expireAt)

  return (
    <Card twClasses="p-2 w-56 text-sm h-76 justify-between cursor-pointer hover:shadow-xl duration-100 ease-in-out">
      <div className="flex flex-col gap-1" onClick={handleClick}>
        <img
          src="https://picsum.photos/200/300"
          alt={title}
          className="h-36 w-auto rounded-md"
        />
        <h1 className="text-lg font-light">{title}</h1>
        <p className="text-gray-500">Current Price:</p>
        <p className="font-bold text-2xl">${finalPrice}</p>
        <div className="flex justify-between">
          <p className="bg-gray-200 p-1 rounded md w-min whitespace-nowrap">
            Views: {views}
          </p>
          <p className="bg-gray-200 p-1 rounded md w-min whitespace-nowrap">
            {category}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="bg-gray-200 p-1 rounded md w-min whitespace-nowrap truncate">
            Expires in: {timeRemaining.days} d, {timeRemaining.hours} h,
            {timeRemaining.minutes} m, and {timeRemaining.seconds} s
          </p>
        </div>
      </div>
    </Card>
  )
}

export default ListingCard
