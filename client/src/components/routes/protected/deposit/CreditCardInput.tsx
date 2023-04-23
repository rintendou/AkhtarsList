import React from "react"

type Props = {
  name: string
  type: "text" | "email" | "password" | "number"
  placeholder: string
  twClasses?: string
  disabled?: boolean
}

const CreditCardInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, type = "text", placeholder, twClasses, ...rest }, ref) => {
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Remove any non-numeric characters from the input value
      const inputCardNumber = e.target.value.replace(/\s+/g, "")

      // Add spaces every 4 digits
      const formattedCardNumber = inputCardNumber
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim()

      // Set the formatted value back to the input field
      e.target.value = formattedCardNumber
    }

    return (
      <div className="relative z-0">
        <input
          {...rest}
          id={name}
          type={type}
          placeholder=""
          className={`${twClasses} pt-5 pl-5 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 rounded-md dark:bg-black dark:text-primary dark:focus:border-tertiary`}
          ref={ref}
          maxLength={19} // Allow for 16 digits + 3 spaces
          onChange={handleCardNumberChange}
        />
        <label
          htmlFor={name}
          className="absolute duration-200 ease-in-out top-3 left-3 -z-1 origin-0 text-secondary dark:bg-black dark:text-primary"
        >
          {placeholder}
        </label>
      </div>
    )
  }
)

export default CreditCardInput
