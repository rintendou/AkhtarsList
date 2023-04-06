import React, { createContext, useEffect, useState } from "react"
import { settings } from "../../settings"

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
  expireAt: number
  views: number
  category: string
  weight: number
  dimensions: [height: number, width: number, length: number]
}

type ContextType = {
  listing?: ListingType
  fetchListing: (listingId: string) => void
}

const initialContext: ContextType = {
  listing: {
    _id: "",
    image: "",
    bidders: [],
    lister: { username: "" },
    title: "",
    desc: "",
    startPrice: 0,
    finalPrice: 0,
    expireAt: 0,
    views: 0,
    category: "",
    weight: 0,
    dimensions: [0, 0, 0],
  },
  fetchListing: () => {},
}

const ListingDetailContext = createContext<ContextType>(initialContext)

const ListingDetailContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [listing, setListing] = useState<ListingType>()
  const [listingId, setListingId] = useState("")

  useEffect(() => {
    const fetchSpecificListing = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/${listingId}`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setListing(json.data)
    }
  }, [listingId])

  const fetchListing = (listingId: string) => {
    setListingId(listingId)
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
