import { useRef } from "react"

import StyledInputRef from "../../../ui/StyledInputRef"

const SellActions = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLInputElement>(null)
  const startPriceRef = useRef<HTMLInputElement>(null)
  const expireAtRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)
  const widthRef = useRef<HTMLInputElement>(null)
  const lengthRef = useRef<HTMLInputElement>(null)

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
          <StyledInputRef
            name="Description"
            placeholder="Description"
            type="text"
            ref={descriptionRef}
          />
          <div className="flex space-x-5">
            <StyledInputRef
              name="Category"
              placeholder="Category"
              type="text"
              ref={categoryRef}
            />
            <StyledInputRef
              name="Starting Price"
              placeholder="Starting Price"
              type="text"
              ref={startPriceRef}
            />
          </div>
          <StyledInputRef
            name="Expiration"
            placeholder="Expiration"
            type="text"
            ref={expireAtRef}
          />
        </div>
        <div className="flex flex-col gap-5">
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
      </form>
    </div>
  )
}

export default SellActions
