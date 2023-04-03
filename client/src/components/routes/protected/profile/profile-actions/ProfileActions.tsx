import { useNavigate } from "react-router-dom"

import StyledButton from "../../../../ui/StyledButton"
import DepositButton from "./DepositButton"
import WithdrawButton from "./WithdrawButton"

type Props = {
  logout: () => void
}

const ProfileActions = ({ logout }: Props) => {
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <div className="flex flex-col gap-5 border-2 p-5 rounded-md">
      <DepositButton />
      <WithdrawButton />
      <StyledButton
        buttonText="Logout"
        onClick={logoutHandler}
        twClasses="w-32 hover:bg-black w-full"
      />
    </div>
  )
}

export default ProfileActions
