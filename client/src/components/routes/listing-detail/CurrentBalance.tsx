import useAuth from "../../../lib/hooks/useAuth"
import useProfile from "../../../lib/hooks/useProfile"

const CurrentBalance = () => {
  const { balance } = useProfile()
  const { auth } = useAuth()

  return auth ? (
    <div className="text-center flex gap-2 items-center">
      Your current balance is:
      <h1 className="text-lg font-semibold">${balance}</h1>
    </div>
  ) : null
}

export default CurrentBalance
