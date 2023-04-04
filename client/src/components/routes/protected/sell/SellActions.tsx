import { useEffect, useRef } from "react"

// Components
import StyledInputRef from "../../../ui/StyledInputRef"
import StyledButton from "../../../ui/StyledButton"
import StyledInputAreaRef from "../../../ui/StyledInputAreaRef"

const SellActions = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const categoryRef = useRef<HTMLInputElement>(null)
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
              <StyledInputRef
                name="Category"
                placeholder="Category"
                type="text"
                ref={categoryRef}
                twClasses="w-full"
              />
            </div>
            <div className="flex-1">
              <StyledInputRef
                name="Starting Price (in $)"
                placeholder="Starting Price (in $)"
                type="text"
                ref={startPriceRef}
                twClasses="w-full"
              />
            </div>
          </div>

          <StyledInputRef
            name="Expiration"
            placeholder="Expiration"
            type="text"
            ref={expireAtRef}
          />
        </div>
        <div className="flex flex-col gap-5 pb-10 border-b border-b-gray-500">
          <StyledInputRef
            name="Weight (in kg)"
            placeholder="Weight (in kg)"
            type="text"
            ref={weightRef}
          />
          <StyledInputRef
            name="Height (in kg)"
            placeholder="Height (in kg)"
            type="text"
            ref={heightRef}
          />
          <StyledInputRef
            name="Width (in kg)"
            placeholder="Width (in kg)"
            type="text"
            ref={widthRef}
          />
          <StyledInputRef
            name="Length (in kg)"
            placeholder="Length (in kg)"
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
