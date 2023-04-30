// Hooks
import { useContext } from "react"

// Context
import { AuthContext } from "../../store/AuthContext"

const useAuthContext = () => {
  return useContext(AuthContext)
}

export default useAuthContext
