import { createContext, useState, ReactNode } from "react"

type User = {
  username: string
  _id: string
}

type initialContextType = {
  auth: User
  setAuth: React.Dispatch<React.SetStateAction<User>>
}

const initialContext = {
  auth: { username: "", _id: "" },
  setAuth: () => {},
}

const AuthContext = createContext<initialContextType>(initialContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User>({ username: "", _id: "" })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
export { AuthContext }
