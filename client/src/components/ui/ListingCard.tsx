// Hooks
import { useNavigate } from "react-router-dom"
import useAuth from "../../lib/hooks/context-hooks/useAuthContext"

// Components
import Card from "./Card"

// Types
import ListingType from "../../lib/types/ListingType"

// Utility Functions
import getNumberWithCommas from "../../lib/util/functions/getNumberWithCommas"
import getTimeRemaining from "../../lib/util/functions/getTimeRemaining"

// Assets
import noImageFound from "/no-image-found-undraw.svg"

const ListingCard = ({ listing }: { listing: ListingType }) => {
  const navigate = useNavigate()
  const { auth } = useAuth()

  const {
    _id,
    lister,
    image,
    title,
    finalPrice,
    expireAt,
    views,
    category,
    bestBidder,
    status,
  } = listing

  const handleClick = () => {
    const viewListing = async () => {
      await fetch(
        `https://rvyt24-${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }.csb.app/api/listing/fetch-view/${_id}`
      )
      navigate(`/listings/${_id}`)
    }
    viewListing()
  }

  const timeRemaining = getTimeRemaining(expireAt)
  const isExpired = timeRemaining === "Expired"

  const isLister = lister === auth._id
  const isHighestBidder = bestBidder === auth._id
  const isStatusSold = status === "sold"
  const isStatusDisputed = status === "disputed"

  return (
    <Card
      twClasses={`p-2 w-56 text-sm h-76 justify-between cursor-pointer hover:shadow-xl duration-100 ease-in-out dark:bg-black dark:hover:bg-slate-900 dark:hover:shadow-tertiary/50 dark:shadow-md`}
    >
      <div
        className={`flex flex-col gap-1 ${isExpired && "opacity-30"}`}
        onClick={handleClick}
      >
        <img
          src={image.length !== 0 ? image : noImageFound}
          alt={title}
          className="h-36 w-auto rounded-md object-cover"
        />
        <div className="flex justify-between">
          <h1 className="text-xl font-bold whitespace-nowrap truncate">
            {title}
          </h1>
        </div>
        <p className="text-gray-500">Current Price:</p>
        <div className="flex justify-between">
          <p className="font-semibold text-xl max-w-[50%] truncate">
            ${getNumberWithCommas(finalPrice)}
          </p>
          <StatusLabel
            isLister={isLister}
            isHighestBidder={isHighestBidder}
            isStatusSold={isStatusSold}
            isStatusDisputed={isStatusDisputed}
          />
        </div>
        <div className="flex justify-between">
          <p className="bg-gray-200 p-1 rounded-md whitespace-nowrap dark:bg-secondary">
            Views: {views}
          </p>
          <p className="bg-gray-200 p-1 rounded-md whitespace-nowrap dark:bg-secondary">
            {category}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="bg-gray-200 p-1 rounded md whitespace-nowrap truncate w-full text-center dark:bg-secondary">
            {timeRemaining}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default ListingCard

type LabelProps = {
  isLister: boolean
  isHighestBidder: boolean
  isStatusSold: boolean
  isStatusDisputed: boolean
}

const StatusLabel = ({
  isLister,
  isHighestBidder,
  isStatusSold,
  isStatusDisputed,
}: LabelProps) => {
  const CrownSVG = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      height="1.5em"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M899.6 276.5L705 396.4 518.4 147.5a8.06 8.06 0 0 0-12.9 0L319 396.4 124.3 276.5c-5.7-3.5-13.1 1.2-12.2 7.9L188.5 865c1.1 7.9 7.9 14 16 14h615.1c8 0 14.9-6 15.9-14l76.4-580.6c.8-6.7-6.5-11.4-12.3-7.9zm-126 534.1H250.3l-53.8-409.4 139.8 86.1L512 252.9l175.7 234.4 139.8-86.1-53.9 409.4zM512 509c-62.1 0-112.6 50.5-112.6 112.6S449.9 734.2 512 734.2s112.6-50.5 112.6-112.6S574.1 509 512 509zm0 160.9c-26.6 0-48.2-21.6-48.2-48.3 0-26.6 21.6-48.3 48.2-48.3s48.2 21.6 48.2 48.3c0 26.6-21.6 48.3-48.2 48.3z"></path>
    </svg>
  )
  if (isStatusSold) {
    return (
      <p className="bg-green-600 text-white p-1 rounded-md dark:bg-green-900">
        Sold
      </p>
    )
  } else if (isStatusDisputed) {
    return (
      <p className="bg-red-600 text-white p-1 rounded-md dark:bg-red-900">
        Disputed
      </p>
    )
  } else if (isLister) {
    return (
      <p className="bg-black text-white p-1 rounded-md dark:bg-tertiary">
        Owned by you
      </p>
    )
  } else if (isHighestBidder) {
    return (
      <div className="bg-black text-white p-1 rounded-md dark:bg-tertiary">
        {CrownSVG}
      </div>
    )
  } else {
    return null
  }
}
