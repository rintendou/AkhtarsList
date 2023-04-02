import { useNavigate } from "react-router-dom"
import useAuth from "../../../lib/hooks/useAuth"

import Card from "../../ui/Card"
import StyledButton from "../../ui/StyledButton"

const Profile = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  const logoutHandler = () => {
    setAuth({ _id: "", username: "" })
    navigate("/", { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="space-y-10">
        <h1 className="text-2xl font-bold">{auth.username}</h1>
        <div>
          <h2 className="text-lg">Address: </h2>
          <h2 className="text-lg">Balance: ${}</h2>
        </div>
      </div>
      <div>
        <StyledButton buttonText="Logout" onClick={logoutHandler} />
      </div>
    </div>
  )
}

export default Profile
