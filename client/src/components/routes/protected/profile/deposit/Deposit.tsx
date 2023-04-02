import { useRef } from "react"
import Card from "../../../../ui/Card"
import StyledInputRef from "../../../../ui/StyledInputRef"

const Deposit = () => {
  const cardHolderRef = useRef<HTMLInputElement>(null)
  const cardNumberRef = useRef<HTMLInputElement>(null)
  const expirationRef = useRef<HTMLInputElement>(null)
  const cvvRef = useRef<HTMLInputElement>(null)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card twClasses="p-20 m-10 shadow-lg space-y-5">
        <h1 className="text-3xl text-center font-bold">Card Payment</h1>
        <form className="flex flex-col gap-5">
          <StyledInputRef
            ref={cardHolderRef}
            name="Card Holder"
            type="text"
            placeholder="Card Holder"
            twClasses="rounded-lg shadow-lg"
          />
          <StyledInputRef
            ref={cardNumberRef}
            name="Card Number"
            type="text"
            placeholder="Card Number"
            twClasses="rounded-lg shadow-lg"
          />
          <div className="flex gap-5">
            <StyledInputRef
              ref={expirationRef}
              name="Expiration"
              type="text"
              placeholder="Expiration"
              twClasses="rounded-lg shadow-lg"
            />
            <StyledInputRef
              ref={cvvRef}
              name="CVV"
              type="text"
              placeholder="CVV"
              twClasses="rounded-lg shadow-lg"
            />
          </div>
          <DepositNowButton />
        </form>
      </Card>
    </div>
  )
}

export default Deposit

const DepositNowButton = () => {
  return (
    <button
      className={`p-4 py-3 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg`}
      type="submit"
    >
      Deposit Now
    </button>
  )
}
