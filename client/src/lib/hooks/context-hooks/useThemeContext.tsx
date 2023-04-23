import { useContext } from "react"
import { ThemeContext } from "../../store/ThemeContext"

const useThemeContext = () => {
  return useContext(ThemeContext)
}

export default useThemeContext
