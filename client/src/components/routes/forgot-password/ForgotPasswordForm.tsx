import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"
import RouterLink from "../../ui/RouterLink"

const ForgotPasswordForm = () => {
  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const usernameRef = useRef<HTMLInputElement>(null)

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
  const getSecurityQuestionsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()

    const getSecurityQuestions = async () => {
      const username = usernameRef.current!.value

      const response = await fetch(
        `http://localhost:5178/api/auth/forgot-password`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
          }),
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
      console.log(data)
    }
    getSecurityQuestions()
  }

  return (
    <Card twClasses="w-[45rem] mx-auto p-20 border-4 border-secondary space-y-16">
      <h1 className="text-4xl font-bold text-center">Reset Password</h1>
      <form className="flex flex-col" onSubmit={getSecurityQuestionsHandler}>
        <h1 className="text-center text-sm mb-10">
          Please enter the username that associated with your account
        </h1>
        <StyledInputRef
          name="Username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
        <ForgetPasswordButton />
      </form>
      {isError && <Error errorMessage={errorMessage} />}
    </Card>
  )
}

export default ForgotPasswordForm

const ForgetPasswordButton = () => {
  return (
    <button
      className={`mt-4 p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm`}
      type="submit"
    >
      Reset Password
    </button>
  )
}
