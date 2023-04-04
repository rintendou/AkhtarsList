import { useEffect, useRef, useState } from "react"
import useProfile from "../../../../lib/hooks/useProfile"

import Card from "../../../ui/Card"
import StyledInputRef from "../../../ui/StyledInputRef"
import Error from "../../../ui/Error"
import Success from "../../../ui/Success"

const Deposit = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { depositFunds } = useProfile()

  const cardHolderRef = useRef<HTMLInputElement>(null)
  const cardNumberRef = useRef<HTMLInputElement>(null)
  const expirationRef = useRef<HTMLInputElement>(null)
  const cvvRef = useRef<HTMLInputElement>(null)
  const depositAmountRef = useRef<HTMLInputElement>(null)

  // Focus on first input on component amount
  useEffect(() => {
    cardHolderRef.current!.focus()
  }, [])

  const depositFundsHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const depositAmount = depositAmountRef.current!.value

    if (isNaN(Number(depositAmount)) || depositAmount.length === 0) {
      setError("Invalid Input!")
      return
    }

    depositFunds(Number(depositAmount))
    depositAmountRef.current!.value = ""
    cardHolderRef.current!.focus()
    setError("")
    setSuccess("Funds Deposited Successfully!")
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card twClasses="p-20 md:p-10 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <h1 className="text-3xl text-center font-bold">Card Payment</h1>
        <form className="flex flex-col gap-5" onSubmit={depositFundsHandler}>
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
          <div className="flex flex-col md:flex-row gap-5">
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
              twClasses="rounded-lg shadow-lg md:w-24"
            />
            <StyledInputRef
              ref={depositAmountRef}
              name="Deposit Amount"
              type="text"
              placeholder="Deposit Amount"
              twClasses="rounded-lg shadow-lg"
            />
          </div>
          <DepositNowButton />
        </form>
        {!error && success && <Success successMessage={success} />}
        {error && <Error errorMessage={error} />}
      </Card>
    </div>
  )
}

export default Deposit

const DepositNowButton = () => {
  return (
    <button
      className={`p-4 py-3 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg shadow-lg`}
      type="submit"
    >
      Deposit Now
    </button>
  )
}
