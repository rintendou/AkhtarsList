import { createContext, useState, ReactNode, useEffect } from "react"

// Types
import ListingType from "../types/ListingType"

// Port Number
import { settings } from "../../settings"

type initialContextType = {
  listing: ListingType
  fetchListing: (listingId: string) => void
}

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
  dimensions: [],
}

const initialContext = {
  listing: initialListingState,
  fetchListing: () => {},
}

const ListingDetailContext = createContext<initialContextType>(initialContext)

const ListingDetailContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [listing, setListing] = useState<ListingType>(initialListingState)

  const fetchListing = (listingId: string) => {
    const fetchListingDetail = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/${listingId}`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setListing(json.data)
    }

    fetchListingDetail()
  }

  const contextValue = {
    listing,
    fetchListing,
  }

  return (
    <ListingDetailContext.Provider value={contextValue}>
      {children}
    </ListingDetailContext.Provider>
  )
}

export default ListingDetailContextProvider
export { ListingDetailContext }
