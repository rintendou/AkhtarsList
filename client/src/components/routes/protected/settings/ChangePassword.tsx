import { useRef } from "react"
import PasswordInputRef from "../../../ui/PasswordInputRef"
import { settings } from "../../../../settings"

const ChangePassword = () => {
  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const newConfirmPasswordRef = useRef<HTMLInputElement>(null)

  const changePasswordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const oldPassword = oldPasswordRef.current!.value
    const newPassword = newPasswordRef.current!.value
    const newConfirmPassword = newConfirmPasswordRef.current!.value

    const payload = {
      oldPassword,
      newPassword,
      newConfirmPassword,
    }

    const changePassword = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/auth/change/password`,
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
    changePassword()
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Change Password</h1>
      <form className="flex flex-col gap-5" onSubmit={changePasswordHandler}>
        <PasswordInputRef name="Old Password" ref={oldPasswordRef} />
        <PasswordInputRef name="New Password" ref={newPasswordRef} />
        <PasswordInputRef name="Confirm Password" ref={newConfirmPasswordRef} />
        <ChangePasswordButton />
      </form>
    </div>
  )
}

const ChangePasswordButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg`}
      type="submit"
    >
      Change Password
    </button>
  )
}

export default ChangePassword
