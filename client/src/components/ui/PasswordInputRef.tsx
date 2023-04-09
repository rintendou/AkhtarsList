import React from "react"
import usePasswordToggle from "../../lib/hooks/usePasswordToggle"

type Props = {
  name: string
  twClasses?: string
}

const PasswordInputRef = React.forwardRef<HTMLInputElement, Props>(
  ({ name, twClasses, ...rest }, ref) => {
    const { icon, inputType } = usePasswordToggle()

    return (
      <div className="relative z-0">
        <input
          {...rest}
          id={name}
          placeholder=""
          type={inputType}
          className={`${twClasses} pt-5 pl-5 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 rounded-md`}
          ref={ref}
        />
        <label
          htmlFor={name}
          className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary"
        >
          {name}
        </label>
        <div className="absolute top-0 right-0 pr-3 h-full flex items-center">
          {icon}
        </div>
      </div>
    )
  }
)

export default PasswordInputRef
