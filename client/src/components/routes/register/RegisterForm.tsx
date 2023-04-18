import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"
import RouterLink from "../../ui/RouterLink"

import { settings } from "../../../settings"
import PasswordInputRef from "../../ui/PasswordInputRef"

const RegisterForm = () => {
  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const fullNameRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const securityQuestionRef = useRef<HTMLInputElement>(null)
  const securityQuestionAnswerRef = useRef<HTMLInputElement>(null)

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // navigate object to redirect to another page while passing props as well
  // when a successful registration happens, we redirect to the login page
  const navigate = useNavigate()

  // focus on the first input on component mount
  useEffect(() => {
    fullNameRef.current!.focus()
  }, [])

  // send post request to api endpoint /api/auth/register by calling the
  // the endpoint and backend_server_port number: 5178. Payload is passed
  // by attaching data to the body object.
  const registerUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()

    const registerUser = async () => {
      const fullName = fullNameRef.current!.value
      const username = usernameRef.current!.value
      const password = passwordRef.current!.value
      const confirmPassword = confirmPasswordRef.current!.value
      const address = addressRef.current!.value
      const securityQuestion = securityQuestionRef.current!.value
      const securityQuestionAnswer = securityQuestionAnswerRef.current!.value

      const payload = {
        fullName,
        username,
        password,
        confirmPassword,
        address,
        securityQuestion,
        securityQuestionAnswer,
      }

      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      )
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
    <Card twClasses="w-[30rem] md:w-[45rem] mx-auto p-20 border border-secondary space-y-16">
      <h1 className="text-4xl font-bold text-center">Register</h1>
      <form className="flex flex-col gap-5" onSubmit={registerUserHandler}>
        <StyledInputRef
          name="Full Name"
          type="text"
          placeholder="Full Name"
          ref={fullNameRef}
        />
        <StyledInputRef
          name="Username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
        <PasswordInputRef name="Password" ref={passwordRef} />
        <PasswordInputRef name="Confirm Password" ref={confirmPasswordRef} />
        <StyledInputRef
          name="Address"
          type="text"
          placeholder="Address"
          ref={addressRef}
        />
        <StyledInputRef
          name="Security Question"
          type="text"
          placeholder="Security Question"
          ref={securityQuestionRef}
        />
        <StyledInputRef
          name="Security Question Answer"
          type="text"
          placeholder="Security Question Answer"
          ref={securityQuestionAnswerRef}
        />
        <RegisterButton />
      </form>
      <div className="text-center w-full flex flex-col md:flex-row space-x-0 md:space-x-3 justify-center mx-auto">
        <h1>Already have an account?</h1>
        <RouterLink routerLinkText="Login here" to="/login" />
      </div>
      {isError && <Error errorMessage={errorMessage} />}
    </Card>
  )
}

export default RegisterForm

const RegisterButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm`}
      type="submit"
    >
      Register
    </button>
  )
}
