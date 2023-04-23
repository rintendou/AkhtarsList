import { useEffect, useRef, useState } from "react"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import Error from "../../../ui/Error"
import stringInputIsValid from "../../../../lib/util/functions/stringInputValidator"
import Success from "../../../ui/Success"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import StyledInputAreaRef from "../../../ui/StyledInputAreaRef"

const ApplyForAdmin = () => {
  const { auth } = useAuthContext()
  const { refetchUserDetails } = useProfileContext()

  const applicationInputRef = useRef<HTMLTextAreaElement>(null)

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    applicationInputRef.current!.focus()
  }, [])

  const editUserDetailsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const applicationText = applicationInputRef.current!.value

    if (!stringInputIsValid(applicationText)) {
      applicationInputRef.current!.focus()
      setErrorMessage("Application cannot be empty!")
    }

    const payload = {
      userId: auth._id,
      applicationText,
    }

    const editUserDetails = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/user/apply`,
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
        setSuccessMessage("")
        return
      }

      setErrorMessage("")
      setSuccessMessage(json.message)
      refetchUserDetails()
    }
    editUserDetails()
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">
        Interested being an AkhtarsList Admin?
      </h1>
      <form className="flex flex-col gap-5" onSubmit={editUserDetailsHandler}>
        <StyledInputAreaRef
          name="Apply here"
          placeholder="Apply here"
          ref={applicationInputRef}
        />
        <SendApplicationButton />
      </form>
      {!errorMessage && successMessage && (
        <Success successMessage={successMessage} />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  )
}

const SendApplicationButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg dark:bg-tertiary`}
      type="submit"
    >
      Send Application
    </button>
  )
}

export default ApplyForAdmin
