import { useLocation, Outlet, useNavigate } from "react-router-dom"
import useAuth from "../../../lib/hooks/useAuth"

const RequireAuth = () => {
  const { auth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  return auth?.username ? (
    <Outlet />
  ) : (
    navigate("/", { state: { from: location }, replace: true })
  )
}

export default RequireAuth
