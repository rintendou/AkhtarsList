import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"
import RouterLink from "../../ui/RouterLink"

import PasswordInputRef from "../../ui/PasswordInputRef"
import ZipcodeInput from "./ZipcodeInput"

const RegisterForm = () => {
  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const fullNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const securityQuestionRef = useRef<HTMLInputElement>(null)
  const securityQuestionAnswerRef = useRef<HTMLInputElement>(null)

  const streetAddressRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const stateRef = useRef<HTMLInputElement>(null)
  const zipcodeRef = useRef<HTMLInputElement>(null)

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
      const email = emailRef.current!.value
      const username = usernameRef.current!.value
      const password = passwordRef.current!.value
      const confirmPassword = confirmPasswordRef.current!.value
      const securityQuestion = securityQuestionRef.current!.value
      const securityQuestionAnswer = securityQuestionAnswerRef.current!.value

      const streetAddress = streetAddressRef.current!.value
      const city = cityRef.current!.value
      const state = stateRef.current!.value
      const zipcode = zipcodeRef.current!.value

      const payload = {
        fullName,
        email,
        username,
        password,
        confirmPassword,
        address: {
          streetAddress,
          city,
          state,
          zipcode,
        },
        securityQuestion,
        securityQuestionAnswer,
      }

      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/auth/register`,
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
    <Card twClasses="w-[30rem] md:w-[45rem] mx-auto border-2 border-secondary flex flex-col justify-center dark:bg-black dark:border-4 dark:border-tertiary">
      <h1 className="text-4xl font-bold text-center bg-secondary text-primary p-4 dark:bg-black">
        Register
      </h1>
      <div className="p-10">
        <form className="flex flex-col gap-5" onSubmit={registerUserHandler}>
          <StyledInputRef
            name="Full Name"
            type="text"
            placeholder="Full Name"
            ref={fullNameRef}
          />
          <StyledInputRef
            name="Email"
            type="text"
            placeholder="Email"
            ref={emailRef}
          />
          <StyledInputRef
            name="Username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
          />
          <div className="flex justify-between gap-5">
            <PasswordInputRef name="Password" ref={passwordRef} />
            <PasswordInputRef
              name="Confirm Password"
              ref={confirmPasswordRef}
            />
          </div>
          <StyledInputRef
            name="Street Address"
            type="text"
            placeholder="Street Address"
            ref={streetAddressRef}
          />
          <div className="flex gap-3">
            <StyledInputRef
              name="State"
              type="text"
              placeholder="State"
              ref={stateRef}
            />
            <StyledInputRef
              name="City"
              type="text"
              placeholder="City"
              ref={cityRef}
            />
            <ZipcodeInput
              name="Zipcode"
              type="text"
              placeholder="Zipcode"
              ref={zipcodeRef}
            />
          </div>
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
        <div className="text-center w-full flex flex-col p-2 md:flex-row space-x-0 md:space-x-3 justify-center mx-auto text-sm">
          <h1>Already have an account?</h1>
          <RouterLink routerLinkText="Login here" to="/login" />
        </div>
        {isError && <Error errorMessage={errorMessage} />}
      </div>
    </Card>
  )
}

export default RegisterForm

const RegisterButton = () => {
  return (
    <button
      className={`p-4 text-secondary bg-tertiary rounded-lg duration-200 hover:bg-black hover:text-primary ease-in-out  font-bold text-sm`}
      type="submit"
    >
      Register
    </button>
  )
}
