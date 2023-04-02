import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useProfile from "../../../../../lib/hooks/useProfile"

import Card from "../../../../ui/Card"
import StyledInputRef from "../../../../ui/StyledInputRef"
import Error from "../../../../ui/Error"

const Withdraw = () => {
  const [error, setError] = useState("")

  const { balance, withdrawFunds } = useProfile()

  const withdrawFundsRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

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
    navigate("/profile", { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card twClasses="p-20 md:p-10 m-0 md:m-10 shadow-lg space-y-5 w-[45rem]">
        <h1 className="text-6xl text-center font-bold">
          Current Balance: ${`${balance}`}
        </h1>
        <h1 className="text-3xl text-center font-bold">Funds Withdraw</h1>
        <form
          className="flex gap-5 justify-between"
          onSubmit={withdrawFundsHandler}
        >
          <StyledInputRef
            ref={withdrawFundsRef}
            name="Withdraw Amount"
            type="text"
            placeholder="Withdraw Amount"
            twClasses="rounded-lg shadow-lg flex-grow"
          />
          <WithdrawNowButton />
        </form>
        {error && <Error errorMessage={error} />}
      </Card>
    </div>
  )
}

export default Withdraw

const WithdrawNowButton = () => {
  return (
    <button
      className={`p-4 py-2 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg shadow-xl flex-grow`}
      type="submit"
    >
      Withdraw Now
    </button>
  )
}
