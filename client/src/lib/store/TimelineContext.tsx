import { createContext, useState, ReactNode, useEffect } from "react"

// Types
import ListingType from "../types/ListingType"

// Port Number
import { settings } from "../../settings"
import { useQuery } from "@tanstack/react-query"

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
  isLoading: boolean
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
  isLoading: false,
}

const fetchListings = async () => {
  const response = await fetch(
    `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch`
  )
  const json = await response.json()
  return json
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
  // const [isLoading, setIsLoading] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["timelineListings"],
    queryFn: fetchListings,
  })

  // Fetch all and trending listings on component mount
  useEffect(() => {
    // setIsLoading(true)

    const fetchListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch`
      )
      const json = await response.json()

      if (!json.ok) {
        // setIsLoading(false)
        return
      }

      const sneakersListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Sneakers" &&
          new Date(listing.expireAt) > new Date()
      )
      const antiquesListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Antiques" &&
          new Date(listing.expireAt) > new Date()
      )
      const techListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Tech" && new Date(listing.expireAt) > new Date()
      )
      const accessoriesListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Accessories" &&
          new Date(listing.expireAt) > new Date()
      )
      const collectiblesListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Collectibles" &&
          new Date(listing.expireAt) > new Date()
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
        // setIsLoading(false)
        return
      }

      const trendingListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) > new Date()
      )

      setTrendingListings(trendingListings)
      // setIsLoading(false)
    }

    fetchListings()
    fetchTrendingListings()
  }, [])

  const refetchTimeline = () => {
    // setIsLoading(true)

    const fetchListings = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch`
      )
      const json = await response.json()

      if (!json.ok) {
        // setIsLoading(false)
        return
      }

      const sneakersListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Sneakers" &&
          new Date(listing.expireAt) > new Date()
      )
      const antiquesListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Antiques" &&
          new Date(listing.expireAt) > new Date()
      )
      const techListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Tech" && new Date(listing.expireAt) > new Date()
      )
      const accessoriesListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Accessories" &&
          new Date(listing.expireAt) > new Date()
      )
      const collectiblesListings = json.data.filter(
        (listing: ListingType) =>
          listing.category === "Collectibles" &&
          new Date(listing.expireAt) > new Date()
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
        // setIsLoading(false)
        return
      }

      const trendingListings = json.data.filter(
        (listing: ListingType) => new Date(listing.expireAt) > new Date()
      )

      setTrendingListings(trendingListings)
      // setIsLoading(false)
    }

    fetchListings()
    fetchTrendingListings()
  }

  const fetchListingsByCategory = (category: string) => {
    // setIsLoading(true)

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

      // setIsLoading(false)
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
    isLoading,
  }

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  )
}

export default TimelineContextProvider
export { TimelineContext }
