// Hooks
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"

// Components
import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"
import Success from "../../ui/Success"
import RouterLink from "../../ui/RouterLink"
import PasswordInputRef from "../../ui/PasswordInputRef"

// Utility Functions
import stringInputIsValid from "../../../lib/util/functions/stringInputValidator"
import RHFPasswordField from "../../ui/RHFPasswordField"

// Types
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
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ZodLoginFormSchema),
  })

  // focus on the first input on component mount
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current!.focus()
  }, [])

  const [errorMessage, setErrorMessage] = useState(errorMessageFromOtherRoute)
  const [scsMessage, setScsMessage] = useState(successMessage)

  const loginUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()
    const username = usernameRef.current!.value

    const payload = {
      username,
      password,
    }

    const loginUser = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      )

      const data = await response.json()

      if (!data.ok) {
        setErrorMessage(data.message)
        setScsMessage("")
        return
      }

      const token = response.headers.get("authorization")

      setErrorMessage("")
      setScsMessage(data.data.message)
      login(data.data.user._id, token!, data.data.user.isAdmin)
      navigate("/", { replace: true })
    }
    loginUser()
  }

  return (
    <Card twClasses="w-[30rem] md:w-[45rem] mx-auto border-2 border-secondary flex flex-col justify-center dark:bg-black dark:border-4 dark:border-tertiary">
      <h1 className="text-4xl font-bold text-center bg-secondary text-primary p-4 dark:bg-black">
        Login
      </h1>
      <div className="p-10">
        <form
          className="flex flex-col space-y-5 gap-5"
          onSubmit={loginUserHandler}
        >
          <StyledInputRef
            name="Username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
          />
          <div className="flex flex-col">
            <PasswordInputRef name="Password" ref={passwordRef} />
            <RHFPasswordField id="password" name="Password" register={} />
            <RouterLink
              routerLinkText="Forgot Password?"
              twClasses="text-xs ml-auto"
              to="/forgot-password"
            />
          </div>
          <LoginButton />
        </form>
        <div className="text-center w-full flex flex-col p-2 md:flex-row space-x-0 md:space-x-3 justify-center mx-auto text-sm">
          <h1>Don't have an account yet?</h1>
          <RouterLink routerLinkText="Register here" to="/register" />
        </div>
        {!errorMessage && didRegisterSuccessfully && (
          <Success successMessage={scsMessage} />
        )}
        {errorMessage && <Error errorMessage={errorMessage} />}
      </div>
    </Card>
  )
}

export default LoginForm

const LoginButton = () => {
  return (
    <button
      className={`p-4 text-secondary bg-tertiary rounded-lg duration-200 hover:bg-black hover:text-primary ease-in-out font-semibold text-md`}
      type="submit"
    >
      Log In
    </button>
  )
}
