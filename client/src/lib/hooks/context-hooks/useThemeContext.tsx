// Hooks
import { useContext } from "react"

// Context
import { ThemeContext } from "../../store/ThemeContext"

const useThemeContext = () => {
  return useContext(ThemeContext)
}

export default useThemeContext
