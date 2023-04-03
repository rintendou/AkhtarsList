import { useEffect, useRef, useState } from "react"
import useProfile from "../../../../../lib/hooks/useProfile"

import Card from "../../../../ui/Card"
import StyledInputRef from "../../../../ui/StyledInputRef"
import Error from "../../../../ui/Error"
import Success from "../../../../ui/Success"

const Withdraw = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { balance, withdrawFunds } = useProfile()

  const withdrawFundsRef = useRef<HTMLInputElement>(null)

  // Focus on input element on component mount
  useEffect(() => {
    withdrawFundsRef.current!.focus()
  }, [])

  const withdrawFundsHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const depositAmount = withdrawFundsRef.current!.value

    if (isNaN(Number(depositAmount))) {
      setError("Invalid Input!")
      return
    }

    if (Number(depositAmount) > balance) {
      setError("Insufficient Funds!")
      return
    }

    withdrawFunds(Number(depositAmount))
    withdrawFundsRef.current!.value = ""
    withdrawFundsRef.current!.focus()
    setError("")
    setSuccess("Funds Withdrawn Successfully!")
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card twClasses="p-20 md:p-10 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <h1 className="text-3xl text-center font-bold">Current Balance:</h1>
        <p className="text-center text-3xl">${balance}</p>
        <form
          className="flex gap-5 justify-between"
          onSubmit={withdrawFundsHandler}
        >
          <StyledInputRef
            ref={withdrawFundsRef}
            name="Withdraw Amount"
            type="text"
            placeholder="Withdraw Amount"
            twClasses="rounded-lg shadow-lg"
          />
          <WithdrawNowButton />
        </form>{" "}
        {!error && success && <Success successMessage={success} />}
        {error && <Error errorMessage={error} />}
      </Card>
    </div>
  )
}

export default Withdraw

const WithdrawNowButton = () => {
  return (
    <button
      className={`p-4 py-2 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg shadow-xl w-[50%]`}
      type="submit"
    >
      Withdraw Now
    </button>
  )
}
