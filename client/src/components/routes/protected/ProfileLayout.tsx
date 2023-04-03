import { Outlet } from "react-router-dom"
import useAuth from "../../../lib/hooks/useAuth"

import ProfileActions from "./profile/profile-actions/ProfileActions"

const ProfileLayout = () => {
  const { logout } = useAuth()
  return (
    <div className="flex">
      <div className="min-h-screen bg-gray-200 flex flex-col mr-5 py-5">
        <ProfileActions logout={logout} />
      </div>
      <Outlet />
    </div>
  )
}

export default ProfileLayout
