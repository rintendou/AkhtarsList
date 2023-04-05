import UserDetails from "./UserDetails"
import Biddings from "./biddings/Biddings"
import Listings from "./listings/Listings"

const Profile = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <UserDetails />
      <Listings />
      <Biddings />
    </div>
  )
}

export default Profile
