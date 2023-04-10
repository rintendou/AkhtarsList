import { useContext } from "react"
import { ListingDetailContext } from "./DevListingDetailContext"

const useListingDetail = () => {
  return useContext(ListingDetailContext)
}

export default useListingDetail
