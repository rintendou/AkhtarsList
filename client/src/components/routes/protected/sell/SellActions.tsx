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
    <div className="flex-auto bg-gray-200 bg-opacity-50 p-10">
      <form>
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
        <StyledInputRef
          name="Expiration"
          placeholder="Expiration"
          type="text"
          ref={expireAtRef}
        />
        <StyledInputRef
          name="Weight"
          placeholder="Weight"
          type="text"
          ref={weightRef}
        />
        <StyledInputRef
          name="Height"
          placeholder="Height"
          type="text"
          ref={heightRef}
        />
        <StyledInputRef
          name="Width"
          placeholder="Width"
          type="text"
          ref={widthRef}
        />
        <StyledInputRef
          name="Length"
          placeholder="Length"
          type="text"
          ref={lengthRef}
        />
      </form>
    </div>
  )
}

export default SellActions
