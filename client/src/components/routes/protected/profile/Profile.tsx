import { useEffect } from "react"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import UserDetails from "./UserDetails"

const Profile = () => {
  const { refetchUserDetails } = useProfileContext()

  useEffect(() => {
    refetchUserDetails()
  }, [])

  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <UserDetails />
    </div>
  )
}

export default Profile
