import { Outlet } from "react-router-dom"
import useAuth from "../../../lib/hooks/useAuth"

import ProfileActions from "./profile/profile-actions/ProfileActions"

const ProfileLayout = () => {
  const { logout } = useAuth()
  return (
    <div className="flex">
      <div className="hidden md:flex min-h-screen bg-purple-100 w-[20.2em] max-w-[20.2em] min-w-[20.2em] flex-col mr-5">
        <ProfileActions logout={logout} />
      </div>
      <Outlet />
    </div>
  )
}

export default ProfileLayout
