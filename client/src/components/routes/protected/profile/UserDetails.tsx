import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import getNumberWithCommas from "../../../../lib/util/functions/getNumberWithCommas"

const UserDetails = () => {
  const { auth } = useAuthContext()
  const { username, balance, address, fullName } = useProfileContext()

  return (
    <div className="space-y-10">
      {auth.isAdmin === "true" ? (
        <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
          Admin Profile
        </h1>
      ) : (
        <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Profile</h1>
      )}

      <div>
        <h1 className="font-semibold">Username</h1>
        <p className="font-light">{username}</p>
      </div>
      <div>
        <h1 className="font-semibold">Full Name</h1>
        <p className="font-light">{fullName}</p>
      </div>
      <div>
        <h1 className="font-semibold">Address</h1>
        <p className="font-light">{address}</p>
      </div>
      <div>
        <h1 className="font-semibold">Balance</h1>
        <p className="font-light">${getNumberWithCommas(balance)}</p>
      </div>
    </div>
  )
}

export default UserDetails
