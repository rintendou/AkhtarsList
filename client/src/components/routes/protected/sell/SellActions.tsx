import { useEffect, useRef } from "react"

const CATEGORIES = [
  "Sneakers",
  "Antiques",
  "Tech",
  "Accessories",
  "Collectibles",
  "Trending",
]

// Components
import StyledInputRef from "../../../ui/StyledInputRef"
import StyledButton from "../../../ui/StyledButton"
import StyledInputAreaRef from "../../../ui/StyledInputAreaRef"
import StyledDropdownRef from "../../../ui/StyledDropdown"

const SellActions = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const startPriceRef = useRef<HTMLInputElement>(null)
  const expireAtRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)
  const widthRef = useRef<HTMLInputElement>(null)
  const lengthRef = useRef<HTMLInputElement>(null)

  // Focus on component mount
  useEffect(() => {
    titleRef.current!.focus()
  }, [])

  return (
    <div className="flex-auto bg-gray-200 bg-opacity-50 p-10 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none">
      <form className="space-y-10">
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

          <StyledInputRef
            name="Expiration (MM/DD/YYYY HH:MM:SS)"
            placeholder="Expiration (MM/DD/YYYY HH:MM:SS)"
            type="text"
            ref={expireAtRef}
          />
        </div>

        <div className="flex flex-col gap-5 pb-10 border-b border-b-gray-500">
          <StyledInputRef
            name="Weight (kg)"
            placeholder="Weight (kg)"
            type="text"
            ref={weightRef}
          />

          <StyledInputRef
            name="Height (kg)"
            placeholder="Height (kg)"
            type="text"
            ref={heightRef}
          />

          <StyledInputRef
            name="Width (kg)"
            placeholder="Width (kg)"
            type="text"
            ref={widthRef}
          />

          <StyledInputRef
            name="Length (kg)"
            placeholder="Length (kg)"
            type="text"
            ref={lengthRef}
          />
        </div>

        <StyledButton
          buttonText="Place Listing Now"
          twClasses="text-2xl py-6 w-full hover:scale-100 hover:bg-black hover:text-tertiary focus:outline-tertiary outline-4 focus:text-tertiary focus:bg-black"
          onClick={() => {}}
        />
      </form>
    </div>
  )
}

export default SellActions
