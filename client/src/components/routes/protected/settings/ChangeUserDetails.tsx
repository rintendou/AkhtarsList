import { useEffect, useRef, useState } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"
import PasswordInputRef from "../../../ui/PasswordInputRef"
import { settings } from "../../../../settings"
import useAuth from "../../../../lib/hooks/useAuth"
import Error from "../../../ui/Error"
import stringInputIsValid from "../../../../lib/util/stringInputValidator"
import Success from "../../../ui/Success"
import useProfile from "../../../../lib/hooks/useProfile"

const ChangeUserDetails = () => {
  const { auth } = useAuth()
  const { refetchUserDetails } = useProfile()

  const { fullName, address } = useProfile()

  const fullNameRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fullNameRef.current!.value = fullName
    addressRef.current!.value = address
  }, [])

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fullNameRef.current!.focus()
  }, [])

  const editUserDetailsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fullName = fullNameRef.current!.value
    const address = addressRef.current!.value
    const password = passwordRef.current!.value

    if (!stringInputIsValid(password)) {
      passwordRef.current!.focus()
    }

    if (!stringInputIsValid(address)) {
      addressRef.current!.focus()
    }

    if (!stringInputIsValid(fullName)) {
      fullNameRef.current!.focus()
    }

    const payload = {
      userId: auth._id,
      password,
      fullName,
      address,
    }

    const editUserDetails = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/auth/change/user-details`,
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
      refetchUserDetails()
    }
    editUserDetails()
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Change User Details</h1>
      <form className="flex flex-col gap-5" onSubmit={editUserDetailsHandler}>
        <StyledInputRef
          name="Full Name"
          type="text"
          placeholder="Full Name"
          ref={fullNameRef}
        />
        <StyledInputRef
          name="Address"
          type="text"
          placeholder="Address"
          ref={addressRef}
        />
        <PasswordInputRef
          name="Password"
          ref={passwordRef}
          autoCompletePassword={false}
        />
        <EditProfileButton />
      </form>
      {!errorMessage && successMessage && (
        <Success successMessage={successMessage} />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  )
}

const EditProfileButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg`}
      type="submit"
    >
      Change User Details
    </button>
  )
}

export default ChangeUserDetails
