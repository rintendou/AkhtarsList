import { createContext, useState, ReactNode, useEffect } from "react"

// Types
import ListingType from "../types/ListingType"

// Port Number
import { settings } from "../../settings"

type initialContextType = {
  allListings: ListingType[]
  trendingListings: ListingType[]
  sneakersListings: ListingType[]
  antiquesListings: ListingType[]
  techListings: ListingType[]
  accessoriesListings: ListingType[]
  collectiblesListings: ListingType[]
  expiredListings: ListingType[]
  unexpiredListings: ListingType[]
  refetchTimeline: () => void
  fetchListingsByCategory: (category: string) => void
}

const initialContext = {
  allListings: [],
  trendingListings: [],
  sneakersListings: [],
  antiquesListings: [],
  techListings: [],
  accessoriesListings: [],
  collectiblesListings: [],
  expiredListings: [],
  unexpiredListings: [],
  refetchTimeline: () => {},
  fetchListingsByCategory: () => {},
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
  const [expiredListings, setExpiredListings] = useState<ListingType[]>([])
  const [unexpiredListings, setUnexpiredListings] = useState<ListingType[]>([])

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
      const expiredListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) < new Date()
      )
      const unexpiredListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) > new Date()
      )

      setAllListings(json.data)
      setSneakersListings(sneakersListings)
      setAntiquesListings(antiquesListings)
      setTechListings(techListings)
      setAccessoriesListings(accessoriesListings)
      setCollectiblesListings(collectiblesListings)
      setExpiredListings(expiredListings)
      setUnexpiredListings(unexpiredListings)
    }

    const fetchTrendingListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch-by-trending`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      const trendingListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) > new Date()
      )

      setTrendingListings(trendingListings)
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
      const expiredListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) < new Date()
      )
      const unexpiredListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) > new Date()
      )

      setAllListings(json.data)
      setSneakersListings(sneakersListings)
      setAntiquesListings(antiquesListings)
      setTechListings(techListings)
      setAccessoriesListings(accessoriesListings)
      setCollectiblesListings(collectiblesListings)
      setExpiredListings(expiredListings)
      setUnexpiredListings(unexpiredListings)
    }

    const fetchTrendingListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch-by-trending`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      const trendingListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) > new Date()
      )

      setTrendingListings(trendingListings)
    }

    fetchListings()
    fetchTrendingListings()
  }

  const fetchListingsByCategory = (category: string) => {
    const fetchCategorizedListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch-by-category/${category}`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }

      switch (category) {
        case "Sneakers":
          setSneakersListings(json.data)
          break
        case "Antiques":
          setAntiquesListings(json.data)
          break
        case "Tech":
          setTechListings(json.data)
          break
        case "Accessories":
          setAccessoriesListings(json.data)
          break
        case "Sneakers":
          setSneakersListings(json.data)
          break
        case "Collectibles":
          setCollectiblesListings(json.data)
          break
      }
    }

    fetchCategorizedListings()
  }

  const contextValue = {
    allListings,
    trendingListings,
    sneakersListings,
    antiquesListings,
    techListings,
    accessoriesListings,
    collectiblesListings,
    expiredListings,
    unexpiredListings,
    refetchTimeline,
    fetchListingsByCategory,
  }

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  )
}

export default TimelineContextProvider
export { TimelineContext }
