import { Outlet } from "react-router-dom"
import ProfileActions from "../profile/profile-actions/ProfileActions"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import ScrollToTop from "../../../../lib/util/components/ScrollToTop"

const ProfileLayout = () => {
  const { logout } = useAuthContext()

  return (
    <div className="flex">
      <ScrollToTop />
      <div className="hidden md:flex min-h-screen bg-purple-100 w-[20.2em] max-w-[20.2em] min-w-[20.2em] flex-col mr-5 dark:bg-black">
        <ProfileActions logout={logout} />
      </div>
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout
