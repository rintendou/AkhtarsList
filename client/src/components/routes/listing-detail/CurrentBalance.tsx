import useProfile from "../../../lib/hooks/useProfile"

const CurrentBalance = () => {
  const { balance } = useProfile()

  return (
    <div className="text-center flex gap-2 items-center">
      Your current balance is:
      <h1 className="text-lg font-semibold">${balance}</h1>
    </div>
  )
}

export default CurrentBalance
