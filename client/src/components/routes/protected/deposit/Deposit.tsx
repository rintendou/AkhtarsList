import { useEffect, useRef, useState } from "react"
import useProfile from "../../../../lib/hooks/useProfile"

import Card from "../../../ui/Card"
import StyledInputRef from "../../../ui/StyledInputRef"
import Error from "../../../ui/Error"
import Success from "../../../ui/Success"
import stringInputIsValid from "../../../../lib/util/stringInputValidator"
import numberInputIsValid from "../../../../lib/util/numberInputValidator"
import CreditCardInput from "../../../ui/CreditCardInput"

const Deposit = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { balance, depositFunds } = useProfile()

  const cardHolderRef = useRef<HTMLInputElement>(null)
  const cardNumberRef = useRef<HTMLInputElement>(null)
  const expirationRef = useRef<HTMLInputElement>(null)
  const cvvRef = useRef<HTMLInputElement>(null)
  const depositAmountRef = useRef<HTMLInputElement>(null)

  // Focus on first input on component amount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    cardHolderRef.current!.focus()
  }, [])

  const depositFundsHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cardHolder = cardHolderRef.current!.value
    const expiration = expirationRef.current!.value
    const cvv = cvvRef.current!.value
    const depositAmount = depositAmountRef.current!.value

    const dirtyCardNumber = cardNumberRef.current!.value
    const cleanCardNumber = dirtyCardNumber.replace(/\s+/g, "")

    if (!stringInputIsValid(cardHolder)) {
      setError("Card Holder is Required!")
      cardHolderRef.current!.focus()
      return
    }

    if (cleanCardNumber.length !== 16 || !numberInputIsValid(cleanCardNumber)) {
      setError("Invalid Card Number!")
      cardNumberRef.current!.focus()
      return
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const expirationYear = parseInt(expiration.substring(3), 10) + 2000
    const expirationMonth = parseInt(expiration.substring(0, 2), 10)

    if (
      !stringInputIsValid(expiration) ||
      expirationYear < currentYear ||
      (expirationYear === currentYear && expirationMonth < currentMonth)
    ) {
      setError("Expiration is Invalid!")
      expirationRef.current!.focus()
      return
    }

    if (!numberInputIsValid(cvv)) {
      setError("Invalid CVV!")
      cvvRef.current!.focus()
      return
    }

    if (!numberInputIsValid(depositAmount)) {
      setError("Invalid Input!")
      depositAmountRef.current!.focus()
      return
    }

    depositFunds(Number(depositAmount))
    depositAmountRef.current!.value = ""
    depositAmountRef.current!.focus()
    setError("")
    setSuccess("Funds Deposited Successfully!")
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card twClasses="p-10 md:p-20 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <h1 className="text-3xl text-center font-semibold">Current Balance:</h1>
        <p className="text-center text-3xl">${balance}</p>
        <form className="flex flex-col gap-5" onSubmit={depositFundsHandler}>
          <StyledInputRef
            ref={cardHolderRef}
            name="Card Holder"
            type="text"
            placeholder="Card Holder"
            twClasses="rounded-lg shadow-lg"
          />
          <CreditCardInput
            ref={cardNumberRef}
            name="Card Number"
            type="text"
            placeholder="Card Number"
            twClasses="rounded-lg shadow-lg"
          />
          <div className="flex flex-col md:flex-row gap-5">
            <StyledInputRef
              ref={expirationRef}
              name="Expiration MM/YY"
              type="text"
              placeholder="Expiration MM/YY"
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
          <StyledInputRef
            ref={depositAmountRef}
            name="Deposit Amount"
            type="text"
            placeholder="Deposit Amount"
            twClasses="rounded-lg shadow-lg"
          />
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
      className={`p-4 py-3 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-semibold text-lg shadow-lg`}
      type="submit"
    >
      Deposit Now
    </button>
  )
}
