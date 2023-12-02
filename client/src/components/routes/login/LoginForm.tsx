// Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"

// Components
import Card from "../../ui/Card"
import Error from "../../ui/Error"
import Success from "../../ui/Success"
import RouterLink from "../../ui/RouterLink"
import RHFPasswordField from "../../ui/RHFPasswordField"

// Validators
import { zodResolver } from "@hookform/resolvers/zod"

// Types
type Props = {
  didRegisterSuccessfully: boolean
  successMessage: string
  errorMessageFromOtherRoute: string
}
import {
  loginFormSchema,
  loginFormType,
} from "../../../../../common/validations/loginFormValidator"
import { useForm } from "react-hook-form"
import RHFInputField from "../../ui/RHFInputField"

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
    setFocus,
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  useEffect(() => {
    setFocus("username")
  }, [])

  const [errorMessage, setErrorMessage] = useState(errorMessageFromOtherRoute)
  const [scsMessage, setScsMessage] = useState(successMessage)

  const loginUserHandler = (data: loginFormType) => {
    const payload = data

    const loginUser = async () => {
      const DOMAIN = import.meta.env.VITE_DOMAIN

      const response = await fetch(`${DOMAIN}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })

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
          onSubmit={handleSubmit(loginUserHandler)}
        >
          <RHFInputField
            id="username"
            register={register("username")}
            error={errors.username?.message}
          />
          <div className="flex flex-col">
            <RHFPasswordField
              id="password"
              name="Password"
              register={register("password")}
              error={errors.password?.message}
            />
            <RouterLink
              routerLinkText="Forgot Password?"
              twClasses="text-xs ml-auto"
              to="/forgot-password"
            />
          </div>
          <LoginButton />
        </form>
        <RegisterLink />
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

const RegisterLink = () => {
  return (
    <div className="text-center w-full flex flex-col p-2 md:flex-row space-x-0 md:space-x-3 justify-center mx-auto text-sm">
      <h1>Don't have an account yet?</h1>
      <RouterLink routerLinkText="Register here" to="/register" />
    </div>
  )
}
