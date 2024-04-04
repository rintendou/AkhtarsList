// Hooks
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Components
import Card from "../../ui/Card"
import Error from "../../ui/Error"
import PasswordInputRef from "../../ui/PasswordInputRef"
import Success from "../../ui/Success"

const ResetPasswordForm = () => {
  const location = useLocation()

  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState(
    location.state.successMessage
  )

  // navigate object to redirect to another page while passing props as well
  // when a successful registration happens, we redirect to the login page
  const navigate = useNavigate()

  // focus on the first input on component mount
  useEffect(() => {
    passwordRef.current!.focus()
  }, [])

  // send post request to api endpoint /api/auth/register by calling the
  // the endpoint and backend_server_port number: 5178. Payload is passed
  // by attaching data to the body object.
  const resetPasswordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()

    const resetPassword = async () => {
      const password = passwordRef.current!.value
      const confirmPassword = confirmPasswordRef.current!.value

      const DOMAIN = import.meta.env.VITE_DOMAIN
      const response = await fetch(`${DOMAIN}/api/auth/reset-password`, {
        method: "POST",
        body: JSON.stringify({
          username: location.state?.username,
          password,
          confirmPassword,
        }),
        headers: { "Content-Type": "application/json" },
      })
      console.log(response)
      const data = await response.json()

      if (!data.ok) {
        setErrorMessage(data.message)
        setSuccessMessage("")
        return
      }

      setSuccessMessage("")
      navigate("/login", {
        state: { didRegisterSuccessfully: true, successMessage: data.message },
      })
      console.log(data)
    }
    resetPassword()
  }

  return (
    <Card twClasses="w-[45rem] mx-auto p-20 border border-secondary space-y-16 dark:bg-black">
      <h1 className="text-4xl font-bold text-center">Reset Password</h1>
      <form className="flex flex-col gap-5" onSubmit={resetPasswordHandler}>
        <PasswordInputRef name="Password" ref={passwordRef} />
        <PasswordInputRef name="Confirm Password" ref={confirmPasswordRef} />
        <ResetPasswordButton />
      </form>
      {errorMessage && <Error errorMessage={errorMessage} />}
      {successMessage && <Success successMessage={successMessage} />}
    </Card>
  )
}

export default ResetPasswordForm

const ResetPasswordButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm dark:bg-tertiary`}
      type="submit"
    >
      Reset Password
    </button>
  )
}
