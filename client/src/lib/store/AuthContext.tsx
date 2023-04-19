import { createContext, useState, ReactNode, useEffect } from "react"

type User = {
  _id: string
  token: string
  isAdmin: string
}

type initialContextType = {
  auth: User
  login: (_id: string, token: string, isAdmin: string) => void
  logout: () => void
  isLoggedIn: boolean
}

const initialUserState = { _id: "", token: "", isAdmin: "" }

const initialContext = {
  auth: initialUserState,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
}

const AuthContext = createContext<initialContextType>(initialContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User>(initialUserState)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (
      localStorage.getItem("_id") !== null &&
      localStorage.getItem("token") !== null &&
      localStorage.getItem("isAdmin") !== null
    ) {
      setAuth({
        _id: localStorage!.getItem("_id")!,
        token: localStorage!.getItem("token")!,
        isAdmin: localStorage!.getItem("isAdmin")!,
      })
      setIsLoggedIn(true)
    }
  }, [])

  const login = (_id: string, token: string, isAdmin: string) => {
    setAuth({ _id, token, isAdmin })
    localStorage.setItem("_id", _id)
    localStorage.setItem("token", token)
    localStorage.setItem("isAdmin", isAdmin)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setAuth({ _id: "", token: "", isAdmin: "" })
    localStorage.removeItem("_id")
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
    setIsLoggedIn(false)
  }

  const contextValue = {
    auth,
    login,
    logout,
    isLoggedIn,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider
export { AuthContext }
