import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  id: string
  type?: string
  register: UseFormRegisterReturn
  error?: string
}

const RHFInputField = ({ id, type = "text", register, error }: Props) => {
  return (
    <div className="relative z-0 mb-8">
      <input
        id={id}
        type={type}
        placeholder=""
        className="pt-5 p-2 block w-full mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 pl-5 rounded-md"
        {...register}
      />
      <label
        htmlFor={id}
        className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary"
      >
        {id}
      </label>
      {error && <p className="text-red-600 text-xs font-semibold">{error}</p>}
    </div>
  )
}

export default RHFInputField
