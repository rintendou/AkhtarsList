import React from "react"
import { useLocation } from "react-router-dom"

const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()
  return <div>RequireAuth</div>
}

export default RequireAuth
