// Hooks
import { useLocation, Outlet, Navigate } from "react-router-dom"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"

const RequireAdmin = () => {
  const { auth } = useAuthContext()

  const location = useLocation()

  return auth.isAdmin === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized-access" state={{ from: location }} replace />
  )
}

export default RequireAdmin
