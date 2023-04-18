import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../../lib/hooks/context-hooks/useAuth"

// Components
import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"
import Success from "../../ui/Success"
import RouterLink from "../../ui/RouterLink"

// Port number
import { settings } from "../../../settings"
import PasswordInputRef from "../../ui/PasswordInputRef"

type Props = {
  didRegisterSuccessfully: boolean
  successMessage: string
  errorMessageFromOtherRoute: string
}

const LoginForm = ({
  didRegisterSuccessfully,
  successMessage,
  errorMessageFromOtherRoute,
}: Props) => {
  const { login } = useAuth()
  const navigate = useNavigate()

  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // focus on the first input on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    usernameRef.current!.focus()
  }, [])
  // Keep track of error
  const [errorMessage, setErrorMessage] = useState(errorMessageFromOtherRoute)

  // Keep track of login success
  const [scsMessage, setScsMessage] = useState(successMessage)

  // send post request to api endpoint /api/auth/login by calling the
  // the endpoint and backend_server_port number: 5178. Payload is passed
  // by attaching data to the body object.
  const loginUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()
    const username = usernameRef.current!.value
    const password = passwordRef.current!.value

    const loginUser = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )

      const data = await response.json()

      if (!data.ok) {
        setErrorMessage(data.message)
        return
      }

      const token = response.headers.get("authorization")

      setScsMessage(data.data.message)
      login(data.data.user._id, token!, data.data.user.isAdmin)
      navigate("/", { replace: true })
    }
    loginUser()
  }

  return (
    <Card twClasses="w-[30rem] md:w-[45rem] mx-auto p-20 border border-secondary space-y-16 flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">Log In</h1>
      <form className="flex flex-col gap-5" onSubmit={loginUserHandler}>
        <StyledInputRef
          name="Username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
        <PasswordInputRef name="Password" ref={passwordRef} />
        <RouterLink
          routerLinkText="Forgot Password?"
          twClasses="text-xs ml-auto"
          to="/forgot-password"
        />
        <LoginButton />
      </form>
      <div className="text-center flex flex-col md:flex-row space-x-0 md:space-x-3 mx-auto">
        <h1>Don't have an account yet?</h1>
        <RouterLink routerLinkText="Register here" to="/register" />
      </div>
      {!errorMessage && didRegisterSuccessfully && (
        <Success successMessage={scsMessage} />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </Card>
  )
}

export default LoginForm

const LoginButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm`}
      type="submit"
    >
      Log In
    </button>
  )
}
