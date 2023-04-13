import { createContext, useEffect, useState } from "react"
import ListingType from "../types/ListingType"
import TimeRemainingType from "../types/TimeRemainingType"
import calculateTimeRemaining from "../util/calculateTimeRemaining"
import { settings } from "../../settings"
import { useNavigate, useParams } from "react-router-dom"

const initialListingState = {
  _id: "",
  image: "",
  bestBidder: "",
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

type initialContextType = {
  isLister: boolean
  isExpired: boolean
  isLoading: boolean
  listing: ListingType
  bidders: string[]
  transactions: string[]
  timeRemaining: TimeRemainingType
  refetchListing: () => void
}

const initialContext: initialContextType = {
  isLister: false,
  isExpired: false,
  isLoading: false,
  listing: initialListingState,
  bidders: [],
  transactions: [],
  timeRemaining: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  refetchListing: () => {},
}

const ListingDetailContext = createContext<initialContextType>(initialContext)

const ListingDetailContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLister, setIsLister] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listing, setListing] = useState<ListingType>(initialListingState)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>(
    calculateTimeRemaining(listing.expireAt)
  )
  const [bidders, setBidders] = useState<string[]>([])
  const [transactions, setTransactions] = useState<string[]>([])

  const navigate = useNavigate()
  const { listingId } = useParams()

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

      setBidders(json.data.bidders)
      fetchLister(json.data.lister, json.data)
      setIsLister(isAdmin || isLister)
      setIsExpired(new Date(json.data.expireAt) < new Date())
      setTransactions(json.data.transactions)
    }

    fetchListing()
  }, [listingId])

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
        height: updatedListing.dimensions[0],
        width: updatedListing.dimensions[1],
        length: updatedListing.dimensions[2],
      })
      setIsLoading(false)
    }

    getLister()
  }

  const refetchListing = () => {
    setIsLoading(true)
    const refetchListing = async () => {
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

      setBidders(json.data.bidders)
      fetchLister(json.data.lister, json.data)
      setIsLister(isAdmin || isLister)
      setIsExpired(new Date(json.data.expireAt) < new Date())
      setTransactions(json.data.transactions)
    }

    refetchListing()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const TR = calculateTimeRemaining(listing.expireAt)
      if (
        TR.days === 0 &&
        TR.hours === 0 &&
        TR.minutes === 0 &&
        TR.seconds === 0
      ) {
        setIsExpired(true)
      }

      setTimeRemaining(TR)
    }, 1000)

    return () => clearInterval(interval)
  }, [listing.expireAt])

  const contextValue = {
    bidders,
    transactions,
    isLister,
    isExpired,
    isLoading,
    listing,
    timeRemaining,
    refetchListing,
  }

  return (
    <ListingDetailContext.Provider value={contextValue}>
      {children}
    </ListingDetailContext.Provider>
  )
}

export default ListingDetailContextProvider
export { ListingDetailContext }
