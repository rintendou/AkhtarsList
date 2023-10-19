import { useRef, useState } from "react"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"

// Components
import PasswordInputRef from "../../../ui/PasswordInputRef"
import Error from "../../../ui/Error"
import Success from "../../../ui/Success"

// Utility Functions
import stringInputIsValid from "../../../../lib/util/functions/stringInputValidator"
import isPasswordStrong from "../../../../lib/util/functions/verifyPasswordStrength"

const ChangePassword = () => {
  const { auth } = useAuthContext()

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const newConfirmPasswordRef = useRef<HTMLInputElement>(null)

  const changePasswordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const oldPassword = oldPasswordRef.current!.value
    const newPassword = newPasswordRef.current!.value
    const newConfirmPassword = newConfirmPasswordRef.current!.value

    const payload = {
      userId: auth._id,
      oldPassword,
      newPassword,
      newConfirmPassword,
    }

    if (!stringInputIsValid(oldPassword)) {
      setErrorMessage("Password is a required field!")
      oldPasswordRef.current!.focus()
      return
    }

    if (!isPasswordStrong(newPassword)) {
      setErrorMessage("New Password is Invalid!")
      newPasswordRef.current!.focus()
      return
    }

    if (!isPasswordStrong(newConfirmPassword)) {
      setErrorMessage("Confirm Password is Invalid!")
      newConfirmPasswordRef.current!.focus()
      return
    }

    if (newPassword !== newConfirmPassword) {
      setErrorMessage("Password does not match!")
      newPasswordRef.current!.focus()
      return
    }

    const changePassword = async () => {
      const response = await fetch(
        `https://rvyt24-${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }.csb.app/api/auth/change/password`,
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
    changePassword()
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Change Password</h1>
      <form className="flex flex-col gap-5" onSubmit={changePasswordHandler}>
        <PasswordInputRef
          name="Old Password"
          ref={oldPasswordRef}
          autoCompletePassword={false}
        />
        <PasswordInputRef
          name="New Password"
          ref={newPasswordRef}
          autoCompletePassword={false}
        />
        <PasswordInputRef
          name="Confirm Password"
          ref={newConfirmPasswordRef}
          autoCompletePassword={false}
        />
        <ChangePasswordButton />
      </form>
      {!errorMessage && successMessage && (
        <Success successMessage={successMessage} />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  )
}

const ChangePasswordButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg dark:bg-tertiary`}
      type="submit"
    >
      Change Password
    </button>
  )
}

export default ChangePassword
