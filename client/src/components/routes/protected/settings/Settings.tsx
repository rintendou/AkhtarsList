import { useEffect } from "react"
import ChangePassword from "./ChangePassword"
import ChangeSecurityQuestions from "./ChangeSecurityQuestions"
import EditUserDetails from "./ChangeUserDetails"
import ApplyForAdmin from "./ApplyForAdmin"
import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"

const Settings = () => {
  const { auth } = useAuthContext()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div className="flex flex-col w-full p-5 gap-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Profile</h1>
      <div className="flex flex-col gap-10 max-w-lg pb-10">
        <EditUserDetails />
        <div className="border-b border-b-gray-500"></div>
        <ChangePassword />
        <div className="border-b border-b-gray-500"></div>
        <ChangeSecurityQuestions />

        {!auth.isAdmin && (
          <>
            <div className="border-b border-b-gray-500"></div>
            <ApplyForAdmin />
          </>
        )}
      </div>
    </div>
  )
}

export default Settings
