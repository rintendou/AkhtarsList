import { useLocation, Outlet, Navigate } from "react-router-dom"
import useAuth from "../../../lib/hooks/useAuth"

const RequireAuth = () => {
  const { auth } = useAuth()

  const location = useLocation()

  return auth._id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
