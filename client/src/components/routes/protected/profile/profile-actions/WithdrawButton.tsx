import { useNavigate } from "react-router-dom"
import StyledButton from "../../../../ui/StyledButton"

const WithdrawButton = () => {
  const navigate = useNavigate()

  return (
    <StyledButton
      buttonText="Withdraw"
      onClick={() => navigate("/payments/withdraw")}
      twClasses="w-32"
      intent="secondary"
    />
  )
}

export default WithdrawButton
