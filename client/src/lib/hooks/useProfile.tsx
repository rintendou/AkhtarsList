import { useContext } from "react"
import { ProfileContext } from "../store/ProfileContext"

const useProfile = () => {
  return useContext(ProfileContext)
}

export default useProfile
