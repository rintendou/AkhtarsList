import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledButton from "../../ui/StyledButton"
import StyledInputRef from "../../ui/StyledInputRef"

const RegisterForm = () => {
  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const fullNameRef = useRef<HTMLInputElement>(null)
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

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
  // the endpoint and backend_server_port number: 5000. Payload is passed
  // by attaching data to the body object.
  const registerUserHandler = () => {
    const registerUser = async () => {
      const fullName = fullNameRef.current!.value
      const emailAddress = emailAddressRef.current!.value
      const password = passwordRef.current!.value

      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          username: fullName,
          email: emailAddress,
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
      <div className="flex flex-col">
        <StyledInputRef
          name="Full Name"
          type="text"
          placeholder="Full Name"
          ref={fullNameRef}
        />
        <StyledInputRef
          name="Email Address"
          type="email"
          placeholder="Email Address"
          ref={emailAddressRef}
        />
        <StyledInputRef
          name="Password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </div>
      <StyledButton
        buttonText="Register"
        twClasses="w-full py-3"
        onClick={registerUserHandler}
      />
      {isError && <Error errorMessage={errorMessage} />}
    </Card>
  )
}

export default RegisterForm
