import { Outlet } from "react-router-dom"
import useAuth from "../../../lib/hooks/useAuth"

import ProfileActions from "./profile/profile-actions/ProfileActions"

const ProfileLayout = () => {
  const { logout } = useAuth()
  return (
    <div className="flex">
      <div className="bg-blue-100 h-full w-full flex flex-col md:flex-row justify-around items-center">
        <ProfileActions logout={logout} />
      </div>
      <Outlet />
    </div>
  )
}

export default ProfileLayout
