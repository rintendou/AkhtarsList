// Hooks
import { useEffect, useRef, useState } from "react"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"

// Components
import Card from "../../../ui/Card"
import StyledInputRef from "../../../ui/StyledInputRef"
import Error from "../../../ui/Error"
import Success from "../../../ui/Success"
import CreditCardInput from "./CreditCardInput"
import CVVInput from "./CVVInput"
import ExpirationInput from "./ExpirationInput"

// Utility Functions
import stringInputIsValid from "../../../../lib/util/functions/stringInputValidator"
import verifyCCExpirationDate from "../../../../lib/util/functions/verifyCCExpirationDate"
import getNumberWithCommas from "../../../../lib/util/functions/getNumberWithCommas"
import numberInputIsValid from "../../../../lib/util/functions/numberInputValidator"

const Deposit = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { balance, depositFunds } = useProfileContext()

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
      (expirationYear === currentYear && expirationMonth < currentMonth) ||
      !verifyCCExpirationDate
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
    <div className="flex flex-col justify-center items-center w-[45rem] mx-auto">
      <Card twClasses="shadow-lg border-4 border-secondary dark:bg-black dark:border-4 dark:border-tertiary relative">
        <h1 className="text-2xl font-semibold bg-secondary dark:bg-black text-primary p-4 dark:border-b-4 dark:border-tertiary">
          Deposit
        </h1>
        <div className="p-10 md:p-20 m-0 md:m-10 space-y-5 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center font-semibold">
            Current Balance:
          </h1>
          <p className="text-center text-3xl">
            ${getNumberWithCommas(balance)}
          </p>
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
              <ExpirationInput
                ref={expirationRef}
                name="Expiration MM/YY"
                type="text"
                placeholder="Expiration MM/YY"
                twClasses="rounded-lg shadow-lg"
              />
              <CVVInput
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
        </div>
      </Card>
    </div>
  )
}

export default Deposit

const DepositNowButton = () => {
  return (
    <button
      className={`p-4 py-3 rounded-lg duration-200  ease-in-out text-secondary font-bold text-lg shadow-xl  flex-auto bg-tertiary hover:bg-secondary hover:text-primary`}
      type="submit"
    >
      Deposit
    </button>
  )
}
