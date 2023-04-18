import { useEffect, useRef, useState } from "react"
import useAuth from "../../../../lib/hooks/context-hooks/useAuth"

import numberInputIsValid from "../../../../lib/util/numberInputValidator"
import stringInputIsValid from "../../../../lib/util/stringInputValidator"

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
import StyledDateTimePicker from "../../../ui/StyledDateTimePicker"
import Error from "../../../ui/Error"
import { useNavigate } from "react-router-dom"
import { settings } from "../../../../settings"
import useProfile from "../../../../lib/hooks/context-hooks/useProfile"
import useTimeline from "../../../../lib/hooks/context-hooks/useTimeline"
import DragAndDrop from "../../../ui/DragAndDrop"

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
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [image, setImageUrl] = useState("")

  const { auth } = useAuth()
  const { refetchUserDetails } = useProfile()
  const { refetchTimeline } = useTimeline()

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

    const backupDate = () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(23)
      tomorrow.setMinutes(59)
      return tomorrow
    }

    const payload = {
      title,
      listerId: auth._id,
      desc,
      image: image.length !== 0 ? image : "someRandomArmpit.jpg",
      startPrice,
      expireAt: expireAt || backupDate(),
      category,
      weight,
      dimensions: [height, width, length],
    }

    if (!stringInputIsValid(title)) {
      setError(true)
      setErrorMessage("Title is a required field!")
      titleRef.current!.focus()
      return
    }

    if (!stringInputIsValid(desc)) {
      setError(true)
      setErrorMessage("Description is a required field!")
      descriptionRef.current!.focus()
      return
    }

    if (!stringInputIsValid(category)) {
      setError(true)
      setErrorMessage("Category is a required field!")
      categoryRef.current!.focus()
      return
    }

    if (!numberInputIsValid(startPrice)) {
      setError(true)
      setErrorMessage("Invalid Starting Price!")
      startPriceRef.current!.focus()
      return
    }

    if (!numberInputIsValid(weight)) {
      setError(true)
      setErrorMessage("Invalid Weight!")
      weightRef.current!.focus()
      return
    }

    if (!numberInputIsValid(height)) {
      setError(true)
      setErrorMessage("Invalid Height!")
      heightRef.current!.focus()
      return
    }

    if (!numberInputIsValid(width)) {
      setError(true)
      setErrorMessage("Invalid Width!")
      widthRef.current!.focus()
      return
    }

    if (!numberInputIsValid(length)) {
      setError(true)
      setErrorMessage("Invalid Length!")
      lengthRef.current!.focus()
      return
    }

    const createListing = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/post`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      )

      const data = await response.json()

      if (!data.ok) {
        setError(true)
        setErrorMessage(data.message)
        return
      }

      setError(false)
      setErrorMessage("")
      navigate("/preview", {
        replace: true,
        state: { ...payload, message: "Listing Successfully Posted!" },
      })
      refetchUserDetails()
      refetchTimeline()
    }

    createListing()
  }

  // Keep track of Expiration
  const handleDateTimeChange = (value: Date | null) => {
    setExpireAt(value)
  }

  // Focus on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    titleRef.current!.focus()
  }, [])

  return (
    <>
      <DragAndDrop setImageUrl={setImageUrl} imageUrl={image} />
      <div className="flex-auto bg-purple-100 bg-opacity-50 p-10 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10">
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
        {error && <Error errorMessage={errorMessage} />}
      </div>
    </>
  )
}

export default SellActions

const SubmitListingButton = () => {
  return (
    <button
      className={`p-4 rounded-lg duration-200 ease-in-out bg-secondary text-primary font-bold text-2xl py-6 w-full hover:scale-100 hover:bg-black hover:text-tertiary focus:outline-tertiary outline-4 focus:text-tertiary focus:bg-black`}
      type="submit"
    >
      Place Listing Now
    </button>
  )
}
