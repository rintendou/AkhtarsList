import { useRef } from "react"
import StyledInputRef from "../../../ui/StyledInputRef"

const ChangeSecurityQuestions = () => {
  const addressRef = useRef<HTMLInputElement>(null)
  const newSecurityQuestionRef = useRef<HTMLInputElement>(null)
  const newSecurityQuestionAnswerRef = useRef<HTMLInputElement>(null)

  const changeSecurityQuestionsHandler = () => {}

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Change Security QA</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={changeSecurityQuestionsHandler}
      >
        <StyledInputRef
          name="Password"
          type="password"
          placeholder="Password"
          ref={addressRef}
        />
        <StyledInputRef
          name="New Security Question"
          type="text"
          placeholder="New Security Question"
          ref={newSecurityQuestionRef}
        />
        <StyledInputRef
          name="New Security Question Answer"
          type="text"
          placeholder="New Security Question Answer"
          ref={newSecurityQuestionAnswerRef}
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

export default ChangeSecurityQuestions
