import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [query, setQuery] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (query.length === 0) {
      return
    }

    const fetchListings = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/listing/search?q=${query}`
      )
      const json = await response.json()
      navigate("/search-results", {
        state: { searchResults: json.data, query: query },
      })
    }
    fetchListings()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex-grow mx-auto hidden md:block"
    >
      <button
        type="submit"
        className="absolute t-0 text-gray-700 h-full p-2 dark:text-primary"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <input
        type="text"
        placeholder="Search Listings"
        className="border h-10 bg-secondary border-gray-700 pl-8 pr-10 text-sm focus:outline-none focus:border-tertiary text-primary w-full max-w-lg rounded-lg dark:bg-black"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  )
}

export default SearchBar
