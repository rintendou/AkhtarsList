import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../../lib/hooks/context-hooks/useAuth"

import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledInputRef from "../../ui/StyledInputRef"

import { settings } from "../../../settings"

const ForgotPasswordForm = () => {
  const { auth, login } = useAuth()

  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const usernameRef = useRef<HTMLInputElement>(null)
  const securityQuestionAnswerRef = useRef<HTMLInputElement>(null)

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [didSubmit, setDidSubmit] = useState(false)
  const [securityQuestion, setSecurityQuestion] = useState("")

  const navigate = useNavigate()

  // focus on the first input on component mount
  useEffect(() => {
    usernameRef.current!.focus()
  }, [])

  // send post request to api endpoint /api/auth/get-security-question by calling the
  // the endpoint and backend_server_port number: 5178. Payload is passed
  // by attaching data to the body object.
  const getSecurityQuestionsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()

    const getSecurityQuestions = async () => {
      const username = usernameRef.current!.value

      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/auth/get-security-question`,
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
        navigate("/login", {
          state: {
            didRegisterSuccessfully: false,
            errorMessage: data.message,
          },
        })
        return
      }

      setIsError(false)
      setDidSubmit(true)
      setSecurityQuestion(data.data.securityQuestion)
      login("", data.data.username, "", "")
      console.log("Username:" + data.data.username)
      console.log(data)
    }
    getSecurityQuestions()
  }

  // send post request to api endpoint /api/auth/verify-security-qa by calling the
  // the endpoint and backend_server_port number: 5178. Payload is passed
  // by attaching data to the body object.
  const verifySecurityQAHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()

    const verifySecurityQA = async () => {
      const { username } = auth
      console.log(username)
      const securityQuestionAnswer = securityQuestionAnswerRef.current!.value

      const response = await fetch(
        `http://localhost:5178/api/auth/verify-security-qa`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            securityQuestionAnswer,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
      const data = await response.json()

      console.log(data)
      if (!data.ok) {
        setIsError(true)
        setErrorMessage(data.message)
        navigate("/login", {
          state: {
            didRegisterSuccessfully: false,
            errorMessage: data.message,
          },
        })
        return
      }

      setIsError(false)
      navigate("/reset-password", {
        state: { successMessage: data.message, username: username },
      })
      console.log(data)
    }

    verifySecurityQA()
  }

  return (
    <Card twClasses="w-[45rem] mx-auto p-20 border border-secondary space-y-16">
      <h1 className="text-4xl font-bold text-center">Reset Password</h1>
      {!didSubmit ? (
        <form className="flex flex-col" onSubmit={getSecurityQuestionsHandler}>
          <h1 className="text-center text-sm mb-10">
            Please enter the username that is associated with your account
          </h1>
          <StyledInputRef
            name="Username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
          />
          <ForgetPasswordButton />
        </form>
      ) : (
        <form className="flex flex-col" onSubmit={verifySecurityQAHandler}>
          <h1 className="text-center text-sm mb-10">
            Enter the answer to your security question
          </h1>
          <h1>{securityQuestion}</h1>
          <StyledInputRef
            name="Security Question Answer"
            type="text"
            placeholder="Security Question Answer"
            ref={securityQuestionAnswerRef}
          />
          <SubmitButton />
        </form>
      )}

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

const SubmitButton = () => {
  return (
    <button
      className={`mt-4 p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm`}
      type="submit"
    >
      Submit Answer
    </button>
  )
}
