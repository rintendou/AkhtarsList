import { useLocation, Outlet, Navigate } from "react-router-dom"
import useAuth from "../../../../lib/hooks/useAuth"

const RequireAdmin = () => {
  const { auth } = useAuth()

  const location = useLocation()

  return auth?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAdmin
