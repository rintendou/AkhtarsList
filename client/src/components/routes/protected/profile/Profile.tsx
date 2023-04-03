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
    <div className="flex flex-col items-center">
      <div className="space-y-10">
        <h1 className="text-4xl font-bold">{auth.username}</h1>
        <div>
          <h2 className="text-lg">Address: {address}</h2>
          <h2 className="text-lg">Balance: ${balance}</h2>
        </div>
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
