import { useRef } from "react"
import PasswordInputRef from "../../../ui/PasswordInputRef"

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
        <PasswordInputRef name="Old Password" ref={oldPasswordRef} />
        <PasswordInputRef name="New Password" ref={newPasswordRef} />
        <PasswordInputRef name="Confirm Password" ref={newConfirmPasswordRef} />
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
