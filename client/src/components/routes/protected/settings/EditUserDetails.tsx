import { useRef } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"

const EditUserDetails = () => {
  const addressRef = useRef<HTMLInputElement>(null)
  const securityQuestionRef = useRef<HTMLInputElement>(null)
  const securityQuestionAnswerRef = useRef<HTMLInputElement>(null)

  const editUserDetailsHandler = () => {}

  return (
    <div className="space-y-5 pb-10 border-b border-b-gray-500">
      <h1 className="text-xl font-semibold">Edit User Details</h1>
      <form className="flex flex-col gap-5" onSubmit={editUserDetailsHandler}>
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
