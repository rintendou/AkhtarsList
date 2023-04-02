import { useNavigate } from "react-router-dom"
import StyledButton from "../../../../ui/StyledButton"

const DepositButton = () => {
  const navigate = useNavigate()

  return (
    <StyledButton
      buttonText="Deposit"
      onClick={() => navigate("/payments/deposit")}
      twClasses="w-32 hover:bg-black"
    />
  )
}

export default DepositButton
