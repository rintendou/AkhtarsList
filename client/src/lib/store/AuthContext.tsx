import { createContext, useState, ReactNode, useEffect, useMemo } from "react"

type User = {
  username: string
  _id: string
  token: string
  isAdmin: string
}

type initialContextType = {
  auth: User
  login: (
    _id: string,
    username: string,
    token: string,
    isAdming: string
  ) => void
  logout: () => void
}

const initialContext = {
  auth: { username: "", _id: "", token: "", isAdmin: "" },
  login: () => {},
  logout: () => {},
}

const initialUserState = { username: "", _id: "", token: "", isAdmin: "" }

const AuthContext = createContext<initialContextType>(initialContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User>(initialUserState)

  useEffect(() => {
    if (
      localStorage.getItem("_id") !== null &&
      localStorage.getItem("username") !== null &&
      localStorage.getItem("token") !== null &&
      localStorage.getItem("isAdmin") !== null
    ) {
      setAuth({
        username: localStorage.getItem("username")!,
        _id: localStorage!.getItem("_id")!,
        token: localStorage!.getItem("token")!,
        isAdmin: localStorage!.getItem("isAdmin")!,
      })
    }
  }, [])

  const login = (
    _id: string,
    username: string,
    token: string,
    isAdmin: string
  ) => {
    setAuth({ username, _id, token, isAdmin })
    localStorage.setItem("_id", _id)
    localStorage.setItem("username", username)
    localStorage.setItem("token", token)
    localStorage.setItem("isAdmin", isAdmin)
  }

  const logout = () => {
    setAuth({ username: "", _id: "", token: "", isAdmin: "" })
    localStorage.removeItem("_id")
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
export { AuthContext }
