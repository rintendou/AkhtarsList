import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ListingCard from "../../../ui/ListingCard"

const DisputedBiddings = () => {
  const { disputedListings } = useProfileContext()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Disputed Biddings
      </h1>
      <ul className="flex gap-8 py-8 flex-wrap">
        {disputedListings.length !== 0 ? (
          disputedListings.map((disputedListing) => (
            <li key={disputedListing._id}>
              <ListingCard listing={disputedListing} />
            </li>
          ))
        ) : (
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">
              Great! There has not any been disputed listings that you have won
            </h1>

            <h1 className="font-extralight">
              Your disputed listings will be here
            </h1>
          </div>
        )}
      </ul>
    </div>
  )
}

export default DisputedBiddings
