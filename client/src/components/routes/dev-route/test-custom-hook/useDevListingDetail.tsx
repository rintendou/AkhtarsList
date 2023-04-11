import { useEffect, useState } from "react"

import ListingType from "../../../../lib/types/ListingType"
import TimeRemainingType from "../../../../lib/types/TimeRemainingType"

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

const useDevListingDetail = () => {
  const [isLister, setIsLister] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listing, setListing] = useState<ListingType>(initialListingState)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>(
    calculateTimeRemaining()
  )

  useEffect(() => {
    setListing(fetchedListingState)
    setIsExpired(new Date(fetchedListingState.expireAt) < new Date())
    setIsLoading(false)
  }, [])

  function calculateTimeRemaining(): TimeRemainingType {
    const difference = +new Date(listing.expireAt) - +new Date()
    let timeRemaining: TimeRemainingType = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeRemaining = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeRemaining
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const TR = calculateTimeRemaining()
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

  return {
    isLoading,
    listing,
    isLister,
    isExpired,
    timeRemaining,
  }
}

export default useDevListingDetail
