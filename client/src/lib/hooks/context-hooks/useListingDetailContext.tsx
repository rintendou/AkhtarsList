// Hooks
import { useContext } from "react"

// Context
import { ListingDetailContext } from "../../store/ListingDetailContext"

const useListingDetailContextQuery = () => {
  return useContext(ListingDetailContext)
}

export default useListingDetailContextQuery
