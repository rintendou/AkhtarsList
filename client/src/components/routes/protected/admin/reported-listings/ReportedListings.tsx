import useProfileContext from "../../../../../lib/hooks/context-hooks/useProfileContext"
import ScrollToTop from "../../../../../lib/util/components/ScrollToTop"
import ListingCard from "../../../../ui/ListingCard"
import ReportedListingsReport from "./ReportedListingsReport"

const ReportedListings = () => {
  const { reportedListings } = useProfileContext()

  return (
    <div className="flex flex-col w-full p-5 gap-10">
      <ScrollToTop />
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Disputes</h1>
      <ReportedListingsReport />
      <ul className="flex gap-8 py-8 overflow-x-auto px-8">
        {reportedListings.length !== 0 ? (
          reportedListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))
        ) : (
          <h1>No Disputes Found!</h1>
        )}
      </ul>
    </div>
  )
}

export default ReportedListings
