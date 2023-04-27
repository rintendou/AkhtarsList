import { useEffect, useRef, useState } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"
import PasswordInputRef from "../../../ui/PasswordInputRef"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import Error from "../../../ui/Error"
import stringInputIsValid from "../../../../lib/util/functions/stringInputValidator"
import Success from "../../../ui/Success"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ZipcodeInput from "../../register/ZipcodeInput"

const ChangeUserDetails = () => {
  const { auth } = useAuthContext()
  const { fullName, address, refetchUserDetails } = useProfileContext()
  const { streetAddress, city, state, zipcode } = address

  const fullNameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const streetAddressRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const stateRef = useRef<HTMLInputElement>(null)
  const zipcodeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fullNameRef.current!.value = fullName
    streetAddressRef.current!.value = streetAddress
    cityRef.current!.value = city
    stateRef.current!.value = state
    zipcodeRef.current!.value = String(zipcode)
  }, [])

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fullNameRef.current!.focus()
  }, [])

  const editUserDetailsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fullName = fullNameRef.current!.value
    const streetAddress = streetAddressRef.current!.value
    const city = cityRef.current!.value
    const state = stateRef.current!.value
    const zipcode = zipcodeRef.current!.value
    const password = passwordRef.current!.value

    if (!stringInputIsValid(password)) {
      passwordRef.current!.focus()
    }

    if (!stringInputIsValid(fullName)) {
      fullNameRef.current!.focus()
    }

    const payload = {
      userId: auth._id,
      fullName,
      address: { streetAddress, city, state, zipcode },
      password,
    }

    const editUserDetails = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/auth/change/user-details`,
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

      console.log(json)

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
          name="Street Address"
          type="text"
          placeholder="Street Address"
          ref={streetAddressRef}
        />
        <div className="flex gap-5">
          <StyledInputRef
            name="City"
            type="text"
            placeholder="City"
            ref={cityRef}
          />
          <StyledInputRef
            name="State"
            type="text"
            placeholder="State"
            ref={stateRef}
          />
          <ZipcodeInput
            name="Zipcode"
            type="text"
            placeholder="Zipcode"
            ref={zipcodeRef}
          />
        </div>
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
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg dark:bg-tertiary`}
      type="submit"
    >
      Change User Details
    </button>
  )
}

export default ChangeUserDetails
