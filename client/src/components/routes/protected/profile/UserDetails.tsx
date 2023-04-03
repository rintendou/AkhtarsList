import useAuth from "../../../../lib/hooks/useAuth"
import useProfile from "../../../../lib/hooks/useProfile"

const UserDetails = () => {
  const { auth } = useAuth()
  const { balance, address } = useProfile()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Profile</h1>
      <div>
        <h1 className="font-bold">Username</h1>
        <p>{auth.username}</p>
      </div>
      <div>
        <h1 className="font-bold">Address</h1>
        <p>{address}</p>
      </div>
      <div>
        <h1 className="font-bold">Balance</h1>
        <p>${balance}</p>
      </div>
    </div>
  )
}

export default UserDetails
