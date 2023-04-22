import { useRef, useState } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"
import PasswordInputRef from "../../../ui/PasswordInputRef"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import Error from "../../../ui/Error"
import stringInputIsValid from "../../../../lib/util/functions/stringInputValidator"
import Success from "../../../ui/Success"

const ChangeSecurityQuestions = () => {
  const { auth } = useAuthContext()

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const passwordRef = useRef<HTMLInputElement>(null)
  const newSecurityQuestionRef = useRef<HTMLInputElement>(null)
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
        <StyledInputRef
          name="New Security Question"
          type="text"
          placeholder="New Security Question"
          ref={newSecurityQuestionRef}
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
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg`}
      type="submit"
    >
      Change Security QA
    </button>
  )
}

export default ChangeSecurityQuestions
