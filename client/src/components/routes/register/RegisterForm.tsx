import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"
import RouterLink from "../../ui/RouterLink"

const RegisterForm = () => {
  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // navigate object to redirect to another page while passing props as well
  // when a successful registration happens, we redirect to the login page
  const navigate = useNavigate()

  // focus on the first input on component mount
  useEffect(() => {
    usernameRef.current!.focus()
  }, [])

  // send post request to api endpoint /api/auth/register by calling the
  // the endpoint and backend_server_port number: 5178. Payload is passed
  // by attaching data to the body object.
  const registerUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()

    const registerUser = async () => {
      const username = usernameRef.current!.value
      const password = passwordRef.current!.value
      const confirmPassword = confirmPasswordRef.current!.value
      const address = addressRef.current!.value

      const response = await fetch(`http://localhost:5178/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
          address,
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
      navigate("/login", {
        state: { didRegisterSuccessfully: true, successMessage: data.message },
      })
      console.log(data)
    }
    registerUser()
  }

  return (
    <Card twClasses="w-[45rem] mx-auto p-20 border-4 border-secondary space-y-16">
      <h1 className="text-4xl font-bold text-center">Register</h1>
      <form className="flex flex-col gap-5" onSubmit={registerUserHandler}>
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
        <StyledInputRef
          name="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />
        <StyledInputRef
          name="Address"
          type="text"
          placeholder="Address"
          ref={addressRef}
        />
        <RegisterButton />
      </form>
      <h1 className="text-center">
        Already have an account?{" "}
        <RouterLink routerLinkText="Login here" to="/login" />
      </h1>
      {isError && <Error errorMessage={errorMessage} />}
    </Card>
  )
}

export default RegisterForm

const RegisterButton = () => {
  return (
    <button
      className={`px-4 py-2 rounded-lg hover:scale-105 duration-200 ease-in-out bg-secondary text-primary font-bold text-xl`}
      type="submit"
    >
      Register
    </button>
  )
}
