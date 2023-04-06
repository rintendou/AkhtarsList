import { useContext } from "react"
import { ListingDetailContext } from "../store/ListingDetailContext"

const useListingDetail = () => {
  return useContext(ListingDetailContext)
}

export default useListingDetail
