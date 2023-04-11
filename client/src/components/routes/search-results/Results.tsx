import { useEffect, useState } from "react"
import ListingType from "../../../lib/types/ListingType"
import ListingCard from "../../ui/ListingCard"

const Results = () => {
  const [searchResults, setSearchResults] = useState<ListingType[]>([])

  return (
    <div className="min-h-[30rem] flex flex-col space-y-10">
      <div className="px-10 py-10 bg-purple-100 rounded-md shadow-md">
        <h1 className="text-3xl capitalize font-bold">Search Results</h1>
      </div>
      {searchResults.length !== 0 ? (
        <ul>
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
