import { createContext, useState, ReactNode, useEffect } from "react"

// Types
import ListingType from "../types/ListingType"

// Port Number
import { settings } from "../../settings"
import useAuth from "../hooks/useAuth"

type initialContextType = {
  listing: ListingType
  fetchListing: (listingId: string) => void
  isLister: boolean
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
  height: 0,
  width: 0,
  length: 0,
}

const initialContext = {
  listing: initialListingState,
  fetchListing: () => {},
  isLister: false,
}

const ListingDetailContext = createContext<initialContextType>(initialContext)

const ListingDetailContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [listing, setListing] = useState<ListingType>(initialListingState)
  const [isLister, setIsLister] = useState(false)

  const { auth } = useAuth()

  const fetchListing = (listingId: string) => {
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
      setIsLister(auth._id === json.data.lister)
    }

    fetchListingDetail()
  }

  const contextValue = {
    listing,
    fetchListing,
    isLister,
  }

  return (
    <ListingDetailContext.Provider value={contextValue}>
      {children}
    </ListingDetailContext.Provider>
  )
}

export default ListingDetailContextProvider
export { ListingDetailContext }
