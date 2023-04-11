import { useContext } from "react"
import { ListingDetailContext } from "../store/ListingDetailContext"

const useListingDetailContext = () => {
  return useContext(ListingDetailContext)
}

export default useListingDetailContext
