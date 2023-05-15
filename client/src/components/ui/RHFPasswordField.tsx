// Hooks
import usePasswordToggle from "../../lib/hooks/regular-hooks/usePasswordToggle"
import { UseFormRegisterReturn } from "react-hook-form"

// Types
type Props = {
  id: string
  name: string
  twClasses?: string
  autoCompletePassword?: boolean
  register: UseFormRegisterReturn
  error?: string
}

const RHFPasswordField = ({
  id,
  name,
  register,
  twClasses,
  autoCompletePassword = true,
  error,
}: Props) => {
  const { icon, inputType } = usePasswordToggle()

  const autoComplete = autoCompletePassword
    ? "current-password"
    : "new-password"

  return (
    <div className="relative z-0 dark:bg-black w-full">
      <input
        id={id}
        placeholder=""
        type={inputType}
        className={`${twClasses} pt-5 pl-5 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-tertiary border-gray-200 rounded-md`}
        autoComplete={autoComplete}
        {...register}
      />
      <label
        htmlFor={name}
        className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary dark:text-primary"
      >
        {name}
      </label>
      <div className="absolute top-0 right-0 pr-3 h-full flex items-center">
        {icon}
      </div>
      <p>{error}</p>
    </div>
  )
}

export default RHFPasswordField
