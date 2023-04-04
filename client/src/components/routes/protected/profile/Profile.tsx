import ListingCard from "../../../ui/ListingCard"
import ListingCardSkeleton from "../../../ui/ListingCardSkeleton"
import UserDetails from "./UserDetails"
import Biddings from "./biddings/Biddings"
import Listings from "./listings/Listings"

const Profile = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <UserDetails />
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
