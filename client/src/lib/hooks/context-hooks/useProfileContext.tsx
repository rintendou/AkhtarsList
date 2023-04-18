import { useContext } from "react"
import { ProfileContext } from "../../store/ProfileContext"

const useProfileContext = () => {
  return useContext(ProfileContext)
}

export default useProfileContext
