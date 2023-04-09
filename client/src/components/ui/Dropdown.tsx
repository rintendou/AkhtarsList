import { useEffect, useRef, useState } from "react"

type Option = {
  label: string
  value: string
}

type Props = {
  options: Option[]
  onSelect: (value: string) => void
}

const Dropdown = ({ options, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [isAscending, setIsAscending] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option)
    onSelect(option.value)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [dropdownRef])

  const handleOrderClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    setIsAscending(!isAscending)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-between items-center w-full rounded-md border-2 border-secondary shadow-sm px-4 py-3 bg-primary text-sm font-medium text-secondary focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-tertiary select-none caret-transparent"
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : "Sort By:"}
        <div onClick={handleOrderClick}>
          <svg
            className={`-mr-1 ml-2 h-8 w-8 transform bg-secondary bg-opacity-20 rounded-full p-2 hover:bg-black hover:text-white duration-200 ease-in-out ${
              isAscending ? "rotate-0" : "rotate-180"
            }`}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="2.2em"
            width="2.2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg">
          <ul
            tabIndex={-1}
            role="menu"
            aria-labelledby="options-menu"
            className="py-1 my-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm sm:leading-5"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer hover:bg-gray-100 text-gray-900 hover:text-gray-900 px-4 py-2 text-sm leading-5"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
