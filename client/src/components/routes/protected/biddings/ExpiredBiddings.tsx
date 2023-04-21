import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ListingCard from "../../../ui/ListingCard"

const ExpiredBiddings = () => {
  const { disputedListings } = useProfileContext()

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">
        Expired Biddings
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
              There are currently no expired listings that you have bid on
            </h1>

            <h1 className="font-extralight">
              All your expired biddings will be here
            </h1>
          </div>
        )}
      </ul>
    </div>
  )
}

export default ExpiredBiddings
