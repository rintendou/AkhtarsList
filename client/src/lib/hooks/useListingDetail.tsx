import { useContext } from "react"
import { ListingDetailContext } from "../store/ListingDetailContext"

const useProfile = () => {
  return useContext(ListingDetailContext)
}

export default useProfile
