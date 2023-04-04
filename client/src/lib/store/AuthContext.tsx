import { createContext, useState, ReactNode, useEffect } from "react"

type User = {
  username: string
  _id: string
}

type initialContextType = {
  auth: User
  login: (_id: string, username: string) => void
  logout: () => void
}

const initialContext = {
  auth: { username: "", _id: "" },
  login: () => {},
  logout: () => {},
}

const AuthContext = createContext<initialContextType>(initialContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User>({ username: "", _id: "" })

  useEffect(() => {
    if (
      localStorage.getItem("_id") !== null &&
      localStorage.getItem("username") !== null
    ) {
      setAuth({
        username: localStorage.getItem("username")!,
        _id: localStorage!.getItem("_id")!,
      })
    }
  }, [])

  const login = (_id: string, username: string) => {
    setAuth({ username, _id })
    localStorage.setItem("_id", _id)
    localStorage.setItem("username", username)
  }

  const logout = () => {
    setAuth({ username: "", _id: "" })
    localStorage.removeItem("_id")
    localStorage.removeItem("username")
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
export { AuthContext }
