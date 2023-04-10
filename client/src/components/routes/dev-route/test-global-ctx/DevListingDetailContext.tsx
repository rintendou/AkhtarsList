import { createContext, useEffect, useState } from "react"

import ListingType from "../../../../lib/types/ListingType"
import TimeRemainingType from "../../../../lib/types/TimeRemainingType"
import calculateTimeRemaining from "../../../../lib/util/calculateTimeRemaining"

const initialListingState = {
  _id: "",
  image: "",
  bidders: [],
  lister: "",
  title: "",
  desc: "",
  startPrice: 0,
  finalPrice: 0,
  expireAt: new Date(),
  views: 0,
  category: "General",
  dimensions: [0, 0, 0],
  weight: 0,
  height: 0,
  width: 0,
  length: 0,
}

const fetchedListingState = {
  _id: "1234123412341234",
  image: "12341234",
  bidders: ["sdfsdffd", "Lorem", "Kanor"],
  lister: "Lil Wayne",
  title: "Lil Harry Potter",
  desc: "Hermione Granger",
  startPrice: 23,
  finalPrice: 23,
  expireAt: new Date(new Date().getTime() + 5 * 1000),
  views: 34,
  category: "General",
  dimensions: [1, 2, 3],
  weight: 4,
  height: 5,
  width: 6,
  length: 7,
}

const updatedListingState = {
  _id: "1234123412341234",
  image: "12341234",
  bidders: ["sdfsdffd", "Lorem", "Kanor", "KANOR"],
  lister: "Lil Wayne",
  title: "Lil Harry Potter",
  desc: "Hermione Granger",
  startPrice: 23,
  finalPrice: 47,
  expireAt: new Date(new Date().getTime() + 5 * 1000),
  views: 43,
  category: "General",
  dimensions: [1, 2, 3],
  weight: 4,
  height: 5,
  width: 6,
  length: 7,
}

type initialContextType = {
  isLister: boolean
  isExpired: boolean
  isLoading: boolean
  listing: ListingType
  timeRemaining: TimeRemainingType
  refetchListing: () => void
}

const initialContext: initialContextType = {
  isLister: false,
  isExpired: false,
  isLoading: false,
  listing: initialListingState,
  timeRemaining: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  refetchListing: () => {},
}

const ListingDetailContext = createContext<initialContextType>(initialContext)

const ListingDetailContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLister, setIsLister] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listing, setListing] = useState<ListingType>(initialListingState)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>(
    calculateTimeRemaining(listing.expireAt)
  )

  useEffect(() => {
    setIsLoading(true)
    setListing(fetchedListingState)
    setIsExpired(new Date(fetchedListingState.expireAt) < new Date())
    setIsLoading(false)
  }, [])

  const refetchListing = () => {
    setIsLoading(true)
    console.log("TEST")
    const fetchListing = async () => {
      setListing(updatedListingState)
      setIsExpired(new Date(updatedListingState.expireAt) < new Date())
      setIsLoading(false)
    }

    fetchListing()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const TR = calculateTimeRemaining(listing.expireAt)
      if (
        TR.days === 0 &&
        TR.hours === 0 &&
        TR.minutes === 0 &&
        TR.seconds === 0
      ) {
        setIsExpired(true)
      }

      setTimeRemaining(TR)
    }, 1000)

    return () => clearInterval(interval)
  }, [listing])

  const contextValue = {
    isLister,
    isExpired,
    isLoading,
    listing,
    timeRemaining,
    refetchListing,
  }

  return (
    <ListingDetailContext.Provider value={contextValue}>
      {children}
    </ListingDetailContext.Provider>
  )
}

export default ListingDetailContextProvider
export { ListingDetailContext }
