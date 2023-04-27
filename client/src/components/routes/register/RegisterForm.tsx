import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"
import RouterLink from "../../ui/RouterLink"

import PasswordInputRef from "../../ui/PasswordInputRef"
import ZipcodeInput from "./ZipcodeInput"
import stringInputIsValid from "../../../lib/util/functions/stringInputValidator"
import numberInputIsValid from "../../../lib/util/functions/numberInputValidator"

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

      if (!stringInputIsValid(fullName)) {
        fullNameRef.current!.focus()
        setErrorMessage("Full name is required!")
        return
      }

      if (!stringInputIsValid(email)) {
        emailRef.current!.focus()
        setErrorMessage("Email is required!")
        return
      }

      if (!stringInputIsValid(username)) {
        usernameRef.current!.focus()
        setErrorMessage("Username is required!")
        return
      }

      if (!stringInputIsValid(password)) {
        passwordRef.current!.focus()
        setErrorMessage("Password is required!")
        return
      }

      if (!stringInputIsValid(confirmPassword)) {
        confirmPasswordRef.current!.focus()
        setErrorMessage("Confirm Password is required!")
        return
      }

      if (!stringInputIsValid(securityQuestion)) {
        securityQuestionRef.current!.focus()
        setErrorMessage("Security Question is required!")
        return
      }

      if (!stringInputIsValid(securityQuestionAnswer)) {
        securityQuestionAnswerRef.current!.focus()
        setErrorMessage("Security Question Answer is required!")
        return
      }

      if (!stringInputIsValid(streetAddress)) {
        streetAddressRef.current!.focus()
        setErrorMessage("Street Address is required!")
        return
      }

      if (!stringInputIsValid(city)) {
        cityRef.current!.focus()
        setErrorMessage("City is required!")
        return
      }

      if (!stringInputIsValid(state)) {
        stateRef.current!.focus()
        setErrorMessage("State is required!")
        return
      }

      if (!numberInputIsValid(zipcode)) {
        zipcodeRef.current!.focus()
        setErrorMessage("Zipcode is required!")
        return
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
      const json = await response.json()

      if (!json.ok) {
        setErrorMessage(json.message)
        return
      }

      navigate("/login", {
        state: { didRegisterSuccessfully: true, successMessage: json.message },
      })
    }
    registerUser()
  }

  return (
    <Card twClasses="w-[30rem] md:w-[45rem] mx-auto border-2 border-secondary flex flex-col justify-center dark:bg-black dark:border-4 dark:border-tertiary">
      <h1 className="text-4xl font-bold text-center bg-secondary text-primary p-4 dark:bg-black">
        Register
      </h1>
      <div className="p-10">
        <form
          className="flex flex-col gap-5 space-y-5"
          onSubmit={registerUserHandler}
        >
          <div className="flex flex-col gap-5 pb-10 border-b-2 border-b-secondary">
            <div className="flex items-center gap-5">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-full bg-secondary p-2 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h1 className="font-semibold text-lg">
                Let's Get To Know You Better
              </h1>
            </div>
            <div className="flex gap-5 justify-between">
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
            </div>
          </div>
          <div className="flex flex-col gap-5 pb-10 border-b-2 border-b-secondary">
            <div className="flex items-center gap-5">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-full bg-secondary p-2 text-primary"
              >
                <path d="M608 112c-167.9 0-304 136.1-304 304 0 70.3 23.9 135 63.9 186.5l-41.1 41.1-62.3-62.3a8.15 8.15 0 0 0-11.4 0l-39.8 39.8a8.15 8.15 0 0 0 0 11.4l62.3 62.3-44.9 44.9-62.3-62.3a8.15 8.15 0 0 0-11.4 0l-39.8 39.8a8.15 8.15 0 0 0 0 11.4l62.3 62.3-65.3 65.3a8.03 8.03 0 0 0 0 11.3l42.3 42.3c3.1 3.1 8.2 3.1 11.3 0l253.6-253.6A304.06 304.06 0 0 0 608 720c167.9 0 304-136.1 304-304S775.9 112 608 112zm161.2 465.2C726.2 620.3 668.9 644 608 644c-60.9 0-118.2-23.7-161.2-66.8-43.1-43-66.8-100.3-66.8-161.2 0-60.9 23.7-118.2 66.8-161.2 43-43.1 100.3-66.8 161.2-66.8 60.9 0 118.2 23.7 161.2 66.8 43.1 43 66.8 100.3 66.8 161.2 0 60.9-23.7 118.2-66.8 161.2z"></path>
              </svg>
              <h1 className="font-semibold text-lg">Protect Your Account</h1>
            </div>
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
            <div className="flex gap-5">
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
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-full bg-secondary p-2 text-primary"
              >
                <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
              </svg>
              <h1 className="font-semibold text-lg">For Listing Deliveries</h1>
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
          </div>

          <RegisterButton />
        </form>
        <div className="text-center w-full flex flex-col p-2 md:flex-row space-x-0 md:space-x-3 justify-center mx-auto text-sm">
          <h1>Already have an account?</h1>
          <RouterLink routerLinkText="Login here" to="/login" />
        </div>
        {errorMessage && <Error errorMessage={errorMessage} />}
      </div>
    </Card>
  )
}

export default RegisterForm

const RegisterButton = () => {
  return (
    <button
      className={`p-4 text-secondary bg-tertiary rounded-lg duration-200 hover:bg-black hover:text-primary ease-in-out font-semibold text-md`}
      type="submit"
    >
      Register
    </button>
  )
}
