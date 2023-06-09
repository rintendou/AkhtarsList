// Hooks
import { createContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import useProfileContext from "../hooks/context-hooks/useProfileContext"

// Components
import ListingDetailSkeleton from "../../components/routes/listing-detail/ListingDetailSkeleton"

// Services
import fetchListingDetail from "../api-services/fetchListingDetail"

// Types
import TimeRemainingType from "../types/TimeRemainingType"

// Utility Functions
import calculateTimeRemaining from "../util/functions/calculateTimeRemaining"

type initialContextType = {
  data: any | null
  isLoading: boolean
  timeRemaining: TimeRemainingType
  isExpired: boolean
}

const initialContext: initialContextType = {
  data: null,
  isLoading: false,
  timeRemaining: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  isExpired: false,
}

const ListingDetailContext = createContext<initialContextType>(initialContext)

const ListingDetailContextQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { refetchUserDetails } = useProfileContext()
  const { listingId } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ["listingDetail"],
    queryFn: () => fetchListingDetail(listingId!),
    refetchInterval: 1000,
    retry: false,
  })

  const navigate = useNavigate()

  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>(
    calculateTimeRemaining(data?.expireAt || "")
  )
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const TR = calculateTimeRemaining(data?.expireAt || "")
      if (
        TR.days === 0 &&
        TR.hours === 0 &&
        TR.minutes === 0 &&
        TR.seconds === 0
      ) {
        setIsExpired(true)
      }

      refetchUserDetails()
      setTimeRemaining(TR)
    }, 1000)
    return () => clearInterval(interval)
  }, [data?.expireAt])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [listingId])

  if (error) {
    navigate("/listings/listing-not-found")
    return null
  }
  if (isLoading) {
    return <ListingDetailSkeleton />
  }

  const contextValue = {
    data,
    isLoading,
    timeRemaining,
    isExpired,
  }

  return (
    <ListingDetailContext.Provider value={contextValue}>
      {children}
    </ListingDetailContext.Provider>
  )
}

export default ListingDetailContextQueryProvider
export { ListingDetailContext }
