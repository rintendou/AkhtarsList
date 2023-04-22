import { useLocation, Outlet, Navigate } from "react-router-dom"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"

const RequireAuth = () => {
  const { auth } = useAuthContext()

  const location = useLocation()

  return auth._id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
