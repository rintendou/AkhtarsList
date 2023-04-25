import ListingType from "../../../lib/types/ListingType"
import ListingCard from "../../ui/ListingCard"

type Props = {
  searchResults: ListingType[]
}

const Results = ({ searchResults }: Props) => {
  return (
    <div className="min-h-[30rem] flex flex-col space-y-10 mb-16">
      {searchResults.length !== 0 ? (
        <ul className="flex gap-5 flex-wrap">
          {searchResults.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-4xl font-semibold text-center">
          No Listings Found
        </div>
      )}
    </div>
  )
}

export default Results
