import { useCallback, useMemo, useState } from "react"
import useTimeline from "./useTimeline"

import ListingType from "../types/ListingType"
import { settings } from "../../settings"

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

  const { allListings } = useTimeline()

  const fetchListing = useCallback((listingId: string) => {
    const fetchListingDetail = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/${listingId}`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setListing({
        ...json.data,
        height: json.data.dimensions[0],
        width: json.data.dimensions[1],
        length: json.data.dimensions[2],
      })
    }

    fetchListingDetail()
  }, [])

  const checkIfListingExists = (listingId: string) => {
    return allListings.some((listing) => listing._id === listingId)
  }

  return { listing, fetchListing, checkIfListingExists }
}

export default useListingDetail
