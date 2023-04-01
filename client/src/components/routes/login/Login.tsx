import LoginForm from "./LoginForm"
import { useLocation } from "react-router-dom"

const Login = () => {
  const location = useLocation()
  const didRegisterSuccessfully = location.state?.didRegisterSuccessfully
  const successMessage = location.state?.successMessage

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <LoginForm
        didRegisterSuccessfully={didRegisterSuccessfully}
        successMessage={successMessage}
      />
    </div>
  )
}

export default Login
