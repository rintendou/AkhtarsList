import useProfile from "../../../../../lib/hooks/useProfile"
import Card from "../../../../ui/Card"
import StyledInputRef from "../../../../ui/StyledInputRef"

const Withdraw = () => {
  const { balance, withdrawFunds } = useProfile()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card twClasses="p-20 md:p-10 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <h1 className="text-6xl text-center font-bold">
          Current Balance: ${`${balance}`}
        </h1>
        <h1 className="text-3xl text-center font-bold">Card Payment</h1>
        <form className="flex gap-5 justify-between">
          <StyledInputRef
            name="Deposit Amount"
            type="text"
            placeholder="Deposit Amount"
            twClasses="rounded-lg shadow-lg flex-grow"
          />
          <WithdrawNowButton />
        </form>
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
