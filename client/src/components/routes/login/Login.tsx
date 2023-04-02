import useAuth from "../../../lib/hooks/useAuth"
import { useLocation, Navigate } from "react-router-dom"

import LoginForm from "./LoginForm"

const Login = () => {
  const { auth } = useAuth()

  const location = useLocation()
  const didRegisterSuccessfully = location.state?.didRegisterSuccessfully
  const successMessage = location.state?.successMessage

  return (
    <div className="min-h-screen flex flex-col justify-center">
      {!auth._id ? (
        <LoginForm
          didRegisterSuccessfully={didRegisterSuccessfully}
          successMessage={successMessage}
        />
      ) : (
        <Navigate to="/app" />
      )}
    </div>
  )
}

export default Login
