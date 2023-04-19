import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"
import useProfileContext from "../../../lib/hooks/context-hooks/useProfileContext"
import getNumberWithCommas from "../../../lib/util/functions/getNumberWithCommas"

const CurrentBalance = () => {
  const { balance } = useProfileContext()
  const { isLoggedIn } = useAuthContext()

  return isLoggedIn ? (
    <div className="text-center flex gap-2 items-center">
      Your current balance is:
      <h1 className="text-lg font-semibold">${getNumberWithCommas(balance)}</h1>
    </div>
  ) : null
}

export default CurrentBalance
