import { useLocation, Outlet, Navigate } from "react-router-dom"
import useAuth from "../../../../lib/hooks/context-hooks/useAuthContext"

const RequireAdmin = () => {
  const { auth } = useAuth()

  const location = useLocation()

  return auth.isAdmin === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized-access" state={{ from: location }} replace />
  )
}

export default RequireAdmin
