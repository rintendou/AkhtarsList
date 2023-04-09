import { useRef } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"
import Card from "../../../ui/Card"

const Settings = () => {
  const addressRef = useRef<HTMLInputElement>(null)
  const securityQuestionRef = useRef<HTMLInputElement>(null)
  const securityQuestionAnswerRef = useRef<HTMLInputElement>(null)

  const registerUserHandler = () => {}

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card twClasses="p-10 md:p-20 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <h1 className="text-4xl font-bold text-center">Edit Profile</h1>
        <form className="flex flex-col gap-5" onSubmit={registerUserHandler}>
          <StyledInputRef
            name="Address"
            type="text"
            placeholder="Address"
            ref={addressRef}
          />
          <StyledInputRef
            name="Security Question"
            type="text"
            placeholder="Security Question"
            ref={securityQuestionRef}
          />
          <StyledInputRef
            name="Security Question Answer"
            type="text"
            placeholder="Security Question Answer"
            ref={securityQuestionAnswerRef}
          />
          <EditProfileButton />
        </form>
      </Card>
    </div>
  )
}

const EditProfileButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm`}
      type="submit"
    >
      Register
    </button>
  )
}

export default Settings
