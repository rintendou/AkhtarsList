import { useContext } from "react"
import { ListingDetailContext } from "./ListingDetailContext"

const useListingDetailContext = () => {
  return useContext(ListingDetailContext)
}

export default useListingDetailContext
