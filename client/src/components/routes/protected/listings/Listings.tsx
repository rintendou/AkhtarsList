import DisputedListings from "./DisputedListings"
import UnsoldListings from "./UnsoldListings"
import ListingsToFulfill from "./ListingsToFulfill"
import SoldListings from "./SoldListings"

const Listings = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <ListingsToFulfill />
      <DisputedListings />
      <SoldListings />
      <UnsoldListings />
    </div>
  )
}

export default Listings
