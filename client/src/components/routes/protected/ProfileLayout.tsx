import { Outlet } from "react-router-dom"
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"

import ProfileActions from "./profile/profile-actions/ProfileActions"

const ProfileLayout = () => {
  const { logout } = useAuthContext()

  return (
    <div className="flex">
      <div className="hidden md:flex min-h-screen bg-purple-100 w-[20.2em] max-w-[20.2em] min-w-[20.2em] flex-col mr-5">
        <ProfileActions logout={logout} />
      </div>
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout
