import { useCallback, useEffect, useMemo, useState } from "react"

import ListingType from "../types/ListingType"
import { settings } from "../../settings"
import { useNavigate } from "react-router-dom"
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

      fetchLister(json.data.lister, json.data)
      setIsLister(isAdmin || isLister)
      setIsExpired(new Date(json.data.expireAt) < new Date())
      setIsLoading(false)
    }

    fetchListing()
  }, [])

  const navigate = useNavigate()

  const fetchLister = useCallback(
    (listerId: string, updatedListing: ListingType) => {
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
    },
    []
  )

  return {
    isLoading,
    listing,
    fetchListing,
    isLister,
    isExpired,
    fetchLister,
  }
}

export default useListingDetail
