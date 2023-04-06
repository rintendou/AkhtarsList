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
  expireAt: Date
  views: number
  category: string
  weight: number
  dimensions: [height: number, width: number, length: number]
}

type initialContextType = {
  allListings: ListingType[]
  trendingListings: ListingType[]
  sneakersListings: ListingType[]
  antiquesListings: ListingType[]
  techListings: ListingType[]
  accessoriesListings: ListingType[]
  collectiblesListings: ListingType[]
  refetchTimeline: () => void
}

const initialContext = {
  allListings: [],
  trendingListings: [],
  sneakersListings: [],
  antiquesListings: [],
  techListings: [],
  accessoriesListings: [],
  collectiblesListings: [],
  refetchTimeline: () => {},
}

const TimelineContext = createContext<initialContextType>(initialContext)

const TimelineContextProvider = ({ children }: { children: ReactNode }) => {
  const [allListings, setAllListings] = useState<ListingType[]>([])
  const [trendingListings, setTrendingListings] = useState<ListingType[]>([])
  const [sneakersListings, setSneakersListings] = useState<ListingType[]>([])
  const [antiquesListings, setAntiquesListings] = useState<ListingType[]>([])
  const [techListings, setTechListings] = useState<ListingType[]>([])
  const [accessoriesListings, setAccessoriesListings] = useState<ListingType[]>(
    []
  )
  const [collectiblesListings, setCollectiblesListings] = useState<
    ListingType[]
  >([])

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

      const sneakersListings = json.data.filter(
        (listing: ListingType) => listing.category === "Sneakers"
      )
      const antiquesListings = json.data.filter(
        (listing: ListingType) => listing.category === "Antiques"
      )
      const techListings = json.data.filter(
        (listing: ListingType) => listing.category === "Tech"
      )
      const accessoriesListings = json.data.filter(
        (listing: ListingType) => listing.category === "Accessories"
      )
      const collectiblesListings = json.data.filter(
        (listing: ListingType) => listing.category === "Collectibles"
      )

      setAllListings(json.data)
      setSneakersListings(sneakersListings)
      setAntiquesListings(antiquesListings)
      setTechListings(techListings)
      setAccessoriesListings(accessoriesListings)
      setCollectiblesListings(collectiblesListings)
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

      const sneakersListings = json.data.filter(
        (listing: ListingType) => listing.category === "Sneakers"
      )
      const antiquesListings = json.data.filter(
        (listing: ListingType) => listing.category === "Antiques"
      )
      const techListings = json.data.filter(
        (listing: ListingType) => listing.category === "Tech"
      )
      const accessoriesListings = json.data.filter(
        (listing: ListingType) => listing.category === "Accessories"
      )
      const collectiblesListings = json.data.filter(
        (listing: ListingType) => listing.category === "Collectibles"
      )

      setAllListings(json.data)
      setSneakersListings(sneakersListings)
      setAntiquesListings(antiquesListings)
      setTechListings(techListings)
      setAccessoriesListings(accessoriesListings)
      setCollectiblesListings(collectiblesListings)
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
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
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
