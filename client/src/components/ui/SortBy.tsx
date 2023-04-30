// Hooks
import { useEffect, useRef, useState } from "react"

// Types
type Option = {
  label: string
  value: string
}
type Props = {
  options: Option[]
  onSort: (value: string, isAscending: boolean) => void
}

const SortBy = ({ options, onSort }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [isAscending, setIsAscending] = useState(true)
  const sortByRef = useRef<HTMLDivElement>(null)

  const togglesortBy = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.value)
    onSort(selectedOption, isAscending)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sortByRef.current &&
        !sortByRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [sortByRef])

  const handleOrderClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    setIsAscending(!isAscending)
    onSort(selectedOption, isAscending)
  }

  return (
    <div className="relative" ref={sortByRef}>
      <button
        type="button"
        className="inline-flex justify-between items-center w-56 rounded-md border-2 focus:border-secondary border-gray-200 shadow-sm px-4 py-2  text-sm font-medium text-secondary select-none caret-transparent"
        onClick={togglesortBy}
      >
        <div className="truncate">
          {selectedOption ? `Sort By: ${selectedOption}` : "Sort By:"}
        </div>
        <div onClick={handleOrderClick}>
          <svg
            className={`-mr-1 ml-2 h-8 w-8 transform text-white bg-secondary bg-opacity-20 rounded-full p-2 hover:bg-black hover:text-white duration-200 ease-in-out ${
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

export default SortBy
