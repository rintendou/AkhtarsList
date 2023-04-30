// Hooks
import { createContext, useState, ReactNode, useEffect } from "react"

// Types
type initialContextType = {
  mode: string
  changeTheme: () => void
}

// Initial Values
const initialContext = { mode: "light", changeTheme: () => {} }

const ThemeContext = createContext<initialContextType>(initialContext)

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  )

  const changeTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark"
    setMode(newMode)
  }

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "mode") {
        setMode(e.newValue || "light")
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
    localStorage.setItem("mode", mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
export { ThemeContext }
