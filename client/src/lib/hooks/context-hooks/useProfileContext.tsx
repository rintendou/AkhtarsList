// Hooks
import { useContext } from "react"

// Context
import { ProfileContext } from "../../store/ProfileContext"

const useProfileContext = () => {
  return useContext(ProfileContext)
}

export default useProfileContext
