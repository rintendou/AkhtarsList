import React from "react"

type Props = {
  name: string
  placeholder: string
  twClasses?: string
}

const StyledInputAreaRef = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ name, placeholder, twClasses, ...rest }, ref) => {
    return (
      <div className="relative z-0">
        <textarea
          {...rest}
          id={name}
          placeholder=""
          className={`${twClasses} pt-3 pl-5 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200`}
          ref={ref}
          rows={5}
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
)

export default StyledInputAreaRef
