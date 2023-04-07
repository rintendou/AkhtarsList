import { useEffect, useRef, useState } from "react"
import useProfile from "../../../../lib/hooks/useProfile"

import Card from "../../../ui/Card"
import StyledInputRef from "../../../ui/StyledInputRef"
import Error from "../../../ui/Error"
import Success from "../../../ui/Success"

const Withdraw = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { balance, withdrawFunds } = useProfile()

  const withdrawFundsRef = useRef<HTMLInputElement>(null)

  // Focus on input element on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    withdrawFundsRef.current!.focus()
  }, [])

  const withdrawFundsHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const withdrawAmount = withdrawFundsRef.current!.value

    if (
      isNaN(Number(withdrawAmount)) ||
      withdrawAmount.length === 0 ||
      Number(withdrawAmount) < 0
    ) {
      setError("Invalid Input!")
      withdrawFundsRef.current!.focus()
      return
    }

    if (Number(withdrawAmount) > balance) {
      setError("Insufficient Funds!")
      withdrawFundsRef.current!.focus()
      return
    }

    withdrawFunds(Number(withdrawAmount))
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
            twClasses="rounded-lg shadow-lg flex-auto"
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
      className={`p-4 py-2 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg shadow-xl w-[50%] flex-auto`}
      type="submit"
    >
      Withdraw Now
    </button>
  )
}
