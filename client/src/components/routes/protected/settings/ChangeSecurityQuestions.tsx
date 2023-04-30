// Hooks
import { useRef, useState } from "react"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"

// Components
import StyledInputRef from "../../../ui/StyledInputRef"
import PasswordInputRef from "../../../ui/PasswordInputRef"
import Error from "../../../ui/Error"
import Success from "../../../ui/Success"
import StyledDropdownRef from "../../../ui/StyledDropdown"

// Utility Functions
import stringInputIsValid from "../../../../lib/util/functions/stringInputValidator"

// Constant Variables
const QUESTIONS = [
  "What is your favorite food?",
  "What is your mother's maiden name?",
  "What is the name of your favorite teacher?",
  "What town did you grow up in?",
  "Ooga Booga?",
]

const ChangeSecurityQuestions = () => {
  const { auth } = useAuthContext()

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const passwordRef = useRef<HTMLInputElement>(null)
  const newSecurityQuestionRef = useRef<HTMLSelectElement>(null)
  const newSecurityQuestionAnswerRef = useRef<HTMLInputElement>(null)

  const changeSecurityQAHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const password = passwordRef.current!.value
    const newSecurityQuestion = newSecurityQuestionRef.current!.value
    const newSecurityQAnswer = newSecurityQuestionAnswerRef.current!.value

    const payload = {
      userId: auth._id,
      password,
      newSecurityQuestion,
      newSecurityQAnswer,
    }

    if (!stringInputIsValid(password)) {
      passwordRef.current!.focus()
    }

    if (!stringInputIsValid(newSecurityQAnswer)) {
      newSecurityQuestionAnswerRef.current!.focus()
    }

    if (!stringInputIsValid(newSecurityQuestion)) {
      newSecurityQuestionRef.current!.focus()
    }

    const changeSecurityQA = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/auth/change/security-qa`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      )

      const json = await response.json()

      if (!json.ok) {
        setErrorMessage(json.message)
        return
      }

      setErrorMessage("")
      setSuccessMessage(json.message)
    }
    changeSecurityQA()
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Change Security QA</h1>
      <form className="flex flex-col gap-5" onSubmit={changeSecurityQAHandler}>
        <StyledDropdownRef
          name="New Security Question"
          placeholder="New Security Question"
          ref={newSecurityQuestionRef}
          options={QUESTIONS}
        />
        <StyledInputRef
          name="New Security Question Answer"
          type="text"
          placeholder="New Security Question Answer"
          ref={newSecurityQuestionAnswerRef}
        />
        <PasswordInputRef
          name="Password"
          ref={passwordRef}
          autoCompletePassword={false}
        />
        <ChangeSecurityQAButton />
      </form>
      {!errorMessage && successMessage && (
        <Success successMessage={successMessage} />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  )
}

const ChangeSecurityQAButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg dark:bg-tertiary`}
      type="submit"
    >
      Change Security QA
    </button>
  )
}

export default ChangeSecurityQuestions
