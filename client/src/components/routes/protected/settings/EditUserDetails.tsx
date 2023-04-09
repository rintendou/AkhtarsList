import { useRef } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"
import PasswordInputRef from "../../../ui/PasswordInputRef"
import { settings } from "../../../../settings"

const EditUserDetails = () => {
  const addressRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const editUserDetailsHandler = () => {
    const address = addressRef.current!.value
    const password = passwordRef.current!.value

    const payload = {
      address,
      password,
    }

    const editUserDetails = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/auth/change/user-details`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }
    }
    editUserDetails()
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Edit User Details</h1>
      <form className="flex flex-col gap-5" onSubmit={editUserDetailsHandler}>
        <StyledInputRef
          name="Address"
          type="text"
          placeholder="Address"
          ref={addressRef}
        />
        <PasswordInputRef name="Password" ref={passwordRef} />
        <EditProfileButton />
      </form>
    </div>
  )
}

const EditProfileButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm`}
      type="submit"
    >
      Edit Profile
    </button>
  )
}

export default EditUserDetails
