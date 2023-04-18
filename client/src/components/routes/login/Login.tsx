import useAuth from "../../../lib/hooks/context-hooks/useAuthContext"
import { useLocation, Navigate } from "react-router-dom"

import LoginForm from "./LoginForm"

const Login = () => {
  const { auth } = useAuth()

  const location = useLocation()
  const didRegisterSuccessfully = location.state?.didRegisterSuccessfully
  const successMessage = location.state?.successMessage
  const errorMessage = location.state?.errorMessage

  return (
    <div className="min-h-screen flex flex-col justify-center">
      {!auth._id ? (
        <LoginForm
          didRegisterSuccessfully={didRegisterSuccessfully}
          successMessage={successMessage}
          errorMessageFromOtherRoute={errorMessage}
        />
      ) : (
        <Navigate to="/" />
      )}
    </div>
  )
}

export default Login
