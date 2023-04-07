import { useCallback, useMemo, useState } from "react"

import ListingType from "../types/ListingType"
import { settings } from "../../settings"
import { useNavigate } from "react-router-dom"

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
  weight: 0,
  height: 0,
  width: 0,
  length: 0,
}

const useListingDetail = () => {
  const [listing, setListing] = useState<ListingType>(
    useMemo(() => initialListingState, [])
  )
  const [isLister, setIsLister] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchListing = useCallback((listingId: string) => {
    setIsLoading(true)
    const fetchListingDetail = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/${listingId}`
      )
      const json = await response.json()

      if (!json.ok) {
        setIsLoading(false)
        return
      }

      setListing({
        ...json.data,
        height: json.data.dimensions[0],
        width: json.data.dimensions[1],
        length: json.data.dimensions[2],
      })

      const isAdmin = localStorage.getItem("isAdmin") === "true"
      const isLister = localStorage.getItem("_id") === json.data.lister

      fetchLister(json.data.lister, json.data)
      setIsLister(isAdmin || isLister)
      setIsExpired(json.data.expireAt < new Date())
    }

    fetchListingDetail()
  }, [])

  const navigate = useNavigate()

  const checkIfListingExists = (listingId: string) => {
    setIsLoading(true)
    const checkExistingListing = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch`
      )

      const json = await response.json()

      if (!json.ok) {
        setIsLoading(false)
        navigate("/listings/listing-not-found")
      }

      const listingExists = json.data.some(
        (listing: ListingType) => listing._id === listingId
      )

      if (!listingExists) {
        setIsLoading(false)
        navigate("/listings/listing-not-found")
      }
    }
    checkExistingListing()
  }

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
      })
      setIsLoading(false)
    }

    getLister()
  }

  return {
    isLoading,
    listing,
    fetchListing,
    checkIfListingExists,
    isLister,
    isExpired,
    fetchLister,
  }
}

export default useListingDetail
