import { useNavigate } from "react-router-dom"

import StyledButton from "../../ui/StyledButton"

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
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <StyledButton
          buttonText="Deposit"
          onClick={() => {}}
          twClasses="w-32 hover:bg-black"
        />
        <StyledButton
          buttonText="Withdraw"
          onClick={() => {}}
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
