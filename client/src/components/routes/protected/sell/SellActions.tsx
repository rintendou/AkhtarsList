import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import useProfile from "../../../../lib/hooks/context-hooks/useProfileContext"
import useTimeline from "../../../../lib/hooks/context-hooks/useTimelineContext"

// Components
import StyledInputRef from "../../../ui/StyledInputRef"
import StyledInputAreaRef from "../../../ui/StyledInputAreaRef"
import StyledDropdownRef from "../../../ui/StyledDropdown"
import StyledDateTimePicker from "../../../ui/StyledDateTimePicker"
import Error from "../../../ui/Error"
import DragAndDrop from "../../../ui/DragAndDrop"

// Utility Functions
import numberInputIsValid from "../../../../lib/util/functions/numberInputValidator"
import stringInputIsValid from "../../../../lib/util/functions/stringInputValidator"

// Backend Server Port
import { settings } from "../../../../settings"

// Constant Variables
const CATEGORIES = [
  "Sneakers",
  "Antiques",
  "Tech",
  "Accessories",
  "Collectibles",
  "Trending",
  "General",
]

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

  const [imageUrl, setImageUrl] = useState("")
  const [fileData, setFileData] = useState<File | null>(null)

  const { auth } = useAuthContext()
  const { refetchUserDetails } = useProfile()
  const { refetchTimeline } = useTimeline()
  const navigate = useNavigate()

  const onFileSelection = (f: File | null) => {
    setFileData(f)
    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result as string)
    }
  }

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
      const formData = new FormData()
      formData.append("file", fileData!)
      formData.append("upload_preset", "ugjfytls")

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dgryoqa0j/image/upload",
        { method: "POST", body: formData }
      )
      const cloudinaryJson = await cloudinaryResponse.json()

      const payload = {
        title,
        listerId: auth._id,
        desc,
        image: cloudinaryJson.secure_url || "",
        startPrice,
        expireAt: expireAt || backupDate(),
        category,
        weight,
        dimensions: [height, width, length],
      }

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
      <DragAndDrop
        setImageUrl={setImageUrl}
        onFileSelection={onFileSelection}
        imageUrl={imageUrl}
      />

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
