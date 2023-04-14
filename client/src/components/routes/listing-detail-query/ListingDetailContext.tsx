import { createContext, useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ListingType from "../../../lib/types/ListingType"
import TimeRemainingType from "../../../lib/types/TimeRemainingType"
import { settings } from "../../../settings"
import { useQuery } from "@tanstack/react-query"

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
}

const initialContext: initialContextType = {
  isLister: false,
  isExpired: false,
  isLoading: false,
}

const ListingDetailContext = createContext<initialContextType>(initialContext)

const fetchListingDetail = async () => {
  const { listingId } = useParams()
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
  const [isLister, setIsLister] = useState(false)
  const [isExpired, setIsExpired] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["listingDetail"],
    queryFn: fetchListingDetail,
  })

  const navigate = useNavigate()

  if (error) {
    navigate("/listings/listing-not-found")
    return
  }

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true"
    const isLister = localStorage.getItem("_id") === data.data.lister

    // fetchLister(data.data.lister, data.data)
    setIsLister(isAdmin || isLister)
    setIsExpired(new Date(data.data.expireAt) < new Date())
  }, [isLoading])

  //   const fetchLister = (listerId: string, updatedListing: ListingType) => {
  //     const getLister = async () => {
  //       const response = await fetch(
  //         `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/${listerId}`
  //       )
  //       const json = await response.json()

  //       if (!json.ok) {
  //         return
  //       }

  //       setListing({
  //         ...data,
  //         lister: json.data.username,
  //         height: updatedListing.dimensions[0],
  //         width: updatedListing.dimensions[1],
  //         length: updatedListing.dimensions[2],
  //       })
  //     }

  //     getLister()
  //   }

  const contextValue = {
    data,
    isLister,
    isExpired,
    isLoading,
  }

  return (
    <ListingDetailContext.Provider value={contextValue}>
      {children}
    </ListingDetailContext.Provider>
  )
}

const useListingDetailContextQuery = () => {
  return useContext(ListingDetailContext)
}

export default ListingDetailContextQueryProvider
export { ListingDetailContext, useListingDetailContextQuery }
