import { useNavigate } from "react-router-dom"

import StyledButton from "../../../ui/StyledButton"
import useProfile from "../../../../lib/hooks/useProfile"

type Props = {
  logout: () => void
}

const ProfileActions = ({ logout }: Props) => {
  const { withdrawFunds, depositFunds } = useProfile()

  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <div className="flex flex-col gap-5 border-2 p-5 rounded-md">
      <div className="flex gap-5">
        <StyledButton
          buttonText="Deposit"
          onClick={() => depositFunds(5)}
          twClasses="w-32 hover:bg-black"
        />
        <StyledButton
          buttonText="Withdraw"
          onClick={() => withdrawFunds(5)}
          twClasses="w-32"
          intent="secondary"
        />
      </div>
      <StyledButton
        buttonText="Logout"
        onClick={logoutHandler}
        twClasses="w-32 hover:bg-black w-full"
      />
    </div>
  )
}

export default ProfileActions
