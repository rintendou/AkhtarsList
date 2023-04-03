import useAuth from "../../../../lib/hooks/useAuth"
import useProfile from "../../../../lib/hooks/useProfile"

import ListingCard from "../../../ui/ListingCard"
import ListingCardSkeleton from "../../../ui/ListingCardSkeleton"
import Biddings from "./biddings/Biddings"
import Listings from "./listings/Listings"

const Profile = () => {
  const { auth } = useAuth()
  const { balance, address } = useProfile()

  return (
    <div className="flex flex-col w-full p-5 space-y-10 text-xl">
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

      <Listings />
      <Biddings />

      <ListingCard
        _id="someId"
        img="test"
        title="Dummy Title"
        price={100}
        timeRemaining="10 days"
        views={69}
      />

      <ListingCardSkeleton />
    </div>
  )
}

export default Profile
