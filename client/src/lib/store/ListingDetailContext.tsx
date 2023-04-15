import { createContext, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { settings } from "../../settings"
import { useQuery } from "@tanstack/react-query"
import ListingDetailSkeleton from "../../components/routes/listing-detail/ListingDetailSkeleton"

type initialContextType = {
  data: any | null
  isLoading: boolean
}

const initialContext: initialContextType = {
  data: null,
  isLoading: false,
}

const ListingDetailContext = createContext<initialContextType>(initialContext)

const fetchListingDetail = async (listingId: string) => {
  const response = await fetch(
    `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/${listingId}`
  )
  const json = await response.json()
  return json
}

const ListingDetailContextQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { listingId } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ["listingDetail"],
    queryFn: () => fetchListingDetail(listingId!),
    refetchInterval: 1000,
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [listingId])

  const navigate = useNavigate()

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
  }

  return (
    <ListingDetailContext.Provider value={contextValue}>
      {children}
    </ListingDetailContext.Provider>
  )
}

export default ListingDetailContextQueryProvider
export { ListingDetailContext }
