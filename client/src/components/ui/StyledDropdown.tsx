import React, { useState } from "react"

type Props = {
  name: string
  options: string[]
  placeholder: string
}

const StyledDropdownRef = React.forwardRef<HTMLSelectElement, Props>(
  ({ name, options, placeholder = "", ...rest }, ref) => {
    const [selected, setSelected] = useState("")

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSelected(event.target.value)
    }

    return (
      <div className="relative z-0 w-full">
        <select
          {...rest}
          id={name}
          ref={ref}
          onChange={handleSelectChange}
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
          {selected !== "" && placeholder}
        </label>
      </div>
    )
  }
)

export default StyledDropdownRef
