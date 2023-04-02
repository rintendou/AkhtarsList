import { useEffect, useRef, useState } from "react"
import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledButton from "../../ui/StyledButton"
import StyledInputRef from "../../ui/StyledInputRef"
import Success from "../../ui/Success"
import useAuth from "../../../lib/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import RouterLink from "../../ui/RouterLink"

type Props = {
  didRegisterSuccessfully: boolean
  successMessage: string
}

const LoginForm = ({ didRegisterSuccessfully, successMessage }: Props) => {
  const { login } = useAuth()
  const navigate = useNavigate()

  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // focus on the first input on component mount
  useEffect(() => {
    usernameRef.current!.focus()
  }, [])
  // Keep track of error
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
      const response = await fetch(`http://localhost:5178/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (!data.ok) {
        setIsError(true)
        setErrorMessage(data.message)
        return
      }

      setIsError(false)
      setScsMessage(data.message)
      login(data.data._id, data.data.username)
      navigate("/app", { replace: true })
      console.log(data)
    }
    loginUser()
  }

  return (
    <Card twClasses="w-[45rem] mx-auto p-20 border-4 border-secondary space-y-16 flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">Log In</h1>
      <form className="flex flex-col gap-5" onSubmit={loginUserHandler}>
        <StyledInputRef
          name="Username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
        <StyledInputRef
          name="Password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <RouterLink
          routerLinkText="Forgot Password?"
          twClasses="text-xs ml-auto"
          to="/forgot-password"
        />
        <LoginButton />
      </form>
      <h1 className="text-center">
        Don't have an account yet?{" "}
        <RouterLink routerLinkText="Register here" to="/register" />
      </h1>
      {!isError && didRegisterSuccessfully && (
        <Success successMessage={scsMessage} />
      )}
      {isError && <Error errorMessage={errorMessage} />}
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
