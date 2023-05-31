// Hooks
import { UseFormRegisterReturn } from "react-hook-form"

// Types
type Props = {
  name: string
  id: string
  options: string[]
  placeholder: string
  register: UseFormRegisterReturn
  error?: string
}

const RHFDropdownField = ({
  name,
  options,
  placeholder = "",
  register,
  error,
  ...rest
}: Props) => {
  return (
    <div className="relative z-0 w-full">
      <select
        {...rest}
        id={name}
        {...register}
        className="pt-5 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-tertiary border-gray-200 pl-5 rounded-md dark:bg-black"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="absolute duration-200 ease-in-out top-3 left-2 -z-1 origin-0 text-secondary dark:text-white"
      >
        {placeholder}
      </label>
      {error && <p className="text-red-600 text-xs font-semibold">{error}</p>}
    </div>
  )
}

export default RHFDropdownField
