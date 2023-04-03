import { useNavigate } from "react-router-dom"

import StyledButton from "../../../../ui/StyledButton"

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
      <StyledButton buttonText="Logout" onClick={logoutHandler} twClasses="" />
    </div>
  )
}

export default ProfileActions
