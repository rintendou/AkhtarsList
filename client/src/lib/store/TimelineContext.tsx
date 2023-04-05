import { createContext, useState, ReactNode, useEffect } from "react"

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

type initialContextType = {
  allListings: ListingType[]
  trendingListings: ListingType[]
  refetchTimeline: () => void
}

const initialContext = {
  allListings: [],
  trendingListings: [],
  refetchTimeline: () => {},
}

const TimelineContext = createContext<initialContextType>(initialContext)

const TimelineContextProvider = ({ children }: { children: ReactNode }) => {
  const [allListings, setAllListings] = useState<ListingType[]>([])
  const [trendingListings, setTrendingListings] = useState<ListingType[]>([])

  // Fetch all and trending listings on component mount
  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setAllListings(json.data)
    }

    const fetchTrendingListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch-by-trending`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setTrendingListings(json.data)
    }

    fetchListings()
    fetchTrendingListings()
  }, [])

  const refetchTimeline = () => {
    const fetchListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setAllListings(json.data)
    }

    const fetchTrendingListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch-by-trending`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      setTrendingListings(json.data)
    }

    fetchListings()
    fetchTrendingListings()
  }

  const contextValue = {
    allListings,
    trendingListings,
    refetchTimeline,
  }

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  )
}

export default TimelineContextProvider
export { TimelineContext }
