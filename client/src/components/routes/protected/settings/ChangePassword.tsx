import { useRef } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"

const ChangePassword = () => {
  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const newConfirmPasswordRef = useRef<HTMLInputElement>(null)

  const changeSecurityQuestionsHandler = () => {}

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Change Password</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={changeSecurityQuestionsHandler}
      >
        <StyledInputRef
          name="Old Password"
          type="password"
          placeholder="Old Password"
          ref={oldPasswordRef}
        />
        <StyledInputRef
          name="New Password"
          type="password"
          placeholder="New Password"
          ref={newPasswordRef}
        />
        <StyledInputRef
          name="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          ref={newConfirmPasswordRef}
        />
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

export default ChangePassword
