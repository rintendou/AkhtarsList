// Types
type Props = {
  name: string
  type: "text" | "email" | "password" | "number"
  placeholder: string
}

const StyledInput = ({
  name,
  type = "text",
  placeholder = "",
  ...rest
}: Props) => {
  return (
    <div className="relative z-0 mb-8">
      <input
        {...rest}
        id={name}
        type={type}
        placeholder=""
        className="pt-5 p-2 block w-full mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 pl-5 rounded-md"
      />
      <label
        htmlFor={name}
        className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary"
      >
        {placeholder}
      </label>
    </div>
  )
}

export default StyledInput
