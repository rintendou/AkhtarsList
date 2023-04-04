import React from "react"

type Props = {
  name: string
  options: string[]
  placeholder: string
}

const StyledDropdownRef = React.forwardRef<HTMLSelectElement, Props>(
  ({ name, options, placeholder = "", ...rest }, ref) => {
    return (
      <div className="relative z-0 mb-8">
        <select
          {...rest}
          id={name}
          ref={ref}
          className="pt-3 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 pl-3"
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
          className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary"
        ></label>
      </div>
    )
  }
)

export default StyledDropdownRef
