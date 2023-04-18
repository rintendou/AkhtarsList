import { useContext } from "react"
import { AuthContext } from "../../store/AuthContext"

const useAuthContext = () => {
  return useContext(AuthContext)
}

export default useAuthContext
