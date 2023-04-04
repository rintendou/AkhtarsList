import useAuth from "../../../../lib/hooks/useAuth"
import useProfile from "../../../../lib/hooks/useProfile"

const UserDetails = () => {
  const { auth } = useAuth()
  const { balance, address } = useProfile()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Profile</h1>
      <div>
        <h1 className="font-semibold">Username</h1>
        <p className="font-light">{auth.username}</p>
      </div>
      <div>
        <h1 className="font-semibold">Address</h1>
        <p className="font-light">{address}</p>
      </div>
      <div>
        <h1 className="font-semibold">Balance</h1>
        <p className="font-light">${balance}</p>
      </div>
    </div>
  )
}

export default UserDetails
