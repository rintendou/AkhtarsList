import { useEffect, useRef, useState } from "react"
import useAuth from "../../../../lib/hooks/useAuth"

const CATEGORIES = [
  "Sneakers",
  "Antiques",
  "Tech",
  "Accessories",
  "Collectibles",
  "Trending",
  "General",
]

// Components
import StyledInputRef from "../../../ui/StyledInputRef"
import StyledInputAreaRef from "../../../ui/StyledInputAreaRef"
import StyledDropdownRef from "../../../ui/StyledDropdown"
import StyledDateTimePicker from "./StyledDateTimePicker"
import Error from "../../../ui/Error"
import { useNavigate } from "react-router-dom"

const SellActions = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const startPriceRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)
  const widthRef = useRef<HTMLInputElement>(null)
  const lengthRef = useRef<HTMLInputElement>(null)

  const [expireAt, setExpireAt] = useState<Date | null>(null)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [image] = useState("fakesubway.jpg")

  const { auth } = useAuth()

  const navigate = useNavigate()

  const createListingHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior of reloading page on form submission
    e.preventDefault()
    const title = titleRef.current!.value
    const desc = descriptionRef.current!.value
    const category = categoryRef.current!.value
    const startPrice = startPriceRef.current!.value
    const weight = weightRef.current!.value
    const height = heightRef.current!.value
    const width = widthRef.current!.value
    const length = lengthRef.current!.value

    const payload = {
      title,
      lister: auth.username,
      desc,
      image,
      startPrice,
      expireAt,
      category,
      weight,
      dimension: [height, width, length],
    }
    console.log(payload)

    const createListing = async () => {
      const response = await fetch("http://localhost:5178/api/createListing", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (!data.ok) {
        setIsError(true)
        setErrorMessage(data.message)
        return
      }

      setIsError(false)
      setErrorMessage("")
      navigate("/preview", { replace: true })
    }

    createListing()
  }

  // Keep track of Expiration
  const handleDateTimeChange = (value: Date | null) => {
    setExpireAt(value)
    console.log(expireAt)
  }

  // Focus on component mount
  useEffect(() => {
    titleRef.current!.focus()
  }, [])

  return (
    <div className="flex-auto bg-gray-200 bg-opacity-50 p-10 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none">
      {" "}
      {isError && <Error errorMessage={errorMessage} />}
      <form className="space-y-10" onSubmit={createListingHandler}>
        <div className="flex flex-col gap-5 pb-10 border-b border-b-gray-500">
          <StyledInputRef
            name="Title"
            placeholder="Title"
            type="text"
            ref={titleRef}
          />

          <StyledInputAreaRef
            name="Description"
            placeholder="Description"
            ref={descriptionRef}
          />

          <div className="flex gap-5">
            <div className="flex-1">
              <StyledDropdownRef
                name="Category"
                placeholder="Category"
                ref={categoryRef}
                options={CATEGORIES}
              />
            </div>

            <div className="flex-1">
              <StyledInputRef
                name="Start Price ($)"
                placeholder="Start Price ($)"
                type="text"
                ref={startPriceRef}
              />
            </div>
          </div>

          <StyledDateTimePicker onChange={handleDateTimeChange} />
        </div>

        <div className="flex flex-col gap-5 pb-10 border-b border-b-gray-500">
          <StyledInputRef
            name="Weight (kg)"
            placeholder="Weight (kg)"
            type="text"
            ref={weightRef}
          />

          <StyledInputRef
            name="Height (cm)"
            placeholder="Height (cm)"
            type="text"
            ref={heightRef}
          />

          <StyledInputRef
            name="Width (cm)"
            placeholder="Width (cm)"
            type="text"
            ref={widthRef}
          />

          <StyledInputRef
            name="Length (cm)"
            placeholder="Length (cm)"
            type="text"
            ref={lengthRef}
          />
        </div>

        <SubmitListingButton />
      </form>
    </div>
  )
}

export default SellActions

const SubmitListingButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 ease-in-out bg-secondary text-primary font-bold text-2xl py-6 w-full hover:scale-100 hover:bg-black hover:text-tertiary focus:outline-tertiary outline-4 focus:text-tertiary focus:bg-black`}
      type="submit"
    >
      Log In
    </button>
  )
}
