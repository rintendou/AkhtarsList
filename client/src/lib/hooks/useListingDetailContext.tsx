import { useContext } from "react"
import { ListingDetailContext } from "../store/ListingDetailContext"

const useListingDetailContextQuery = () => {
  return useContext(ListingDetailContext)
}

export default useListingDetailContextQuery
