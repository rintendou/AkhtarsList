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
          className={`${twClasses} pt-5 pl-5 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 rounded-md dark:bg-black dark:focus:border-tertiary`}
          ref={ref}
          rows={5}
        />
        <label
          htmlFor={name}
          className="absolute duration-200 ease-in-out top-3 left-2 -z-1 origin-0 text-secondary dark:text-primary"
        >
          {placeholder}
        </label>
      </div>
    )
  }
)

export default StyledInputAreaRef
