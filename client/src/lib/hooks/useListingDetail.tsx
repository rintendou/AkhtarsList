import { useCallback, useEffect, useMemo, useState } from "react"

import ListingType from "../types/ListingType"
import { settings } from "../../settings"
import { useNavigate, useParams } from "react-router-dom"
import calculateTimeRemaining from "../util/calculateTimeRemaining"
import TimeRemainingType from "../types/TimeRemainingType"

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

const useListingDetail = () => {
  const [isLister, setIsLister] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listing, setListing] = useState<ListingType>(initialListingState)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>(
    calculateTimeRemaining(listing.expireAt)
  )
  const [bidders, setBidders] = useState<string[]>([])

  const navigate = useNavigate()
  const { listingId } = useParams()

  useEffect(() => {
    setIsLoading(true)

    const fetchListing = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/${listingId}`
      )
      const json = await response.json()

      if (!json.ok) {
        setIsLoading(false)
        navigate("/listings/listing-not-found")
        return
      }

      const isAdmin = localStorage.getItem("isAdmin") === "true"
      const isLister = localStorage.getItem("_id") === json.data.lister

      fetchUsernames(listingId!)
      fetchLister(json.data.lister, json.data)
      setIsLister(isAdmin || isLister)
      setIsExpired(new Date(json.data.expireAt) < new Date())
    }

    fetchListing()
  }, [listingId])

  const fetchLister = (listerId: string, updatedListing: ListingType) => {
    setIsLoading(true)

    const getLister = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/${listerId}`
      )
      const json = await response.json()

      if (!json.ok) {
        setIsLoading(false)
        return
      }

      setListing({
        ...updatedListing,
        lister: json.data.username,
        height: updatedListing.dimensions[0],
        width: updatedListing.dimensions[1],
        length: updatedListing.dimensions[2],
      })
      setIsLoading(false)
    }

    getLister()
  }

  const fetchUsernames = (listerId: string) => {
    const getUsernames = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/bidders/${listerId}`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setBidders(json.data)
    }

    getUsernames()
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

  return {
    bidders,
    isLoading,
    listing,
    isLister,
    isExpired,
    timeRemaining,
  }
}

export default useListingDetail
