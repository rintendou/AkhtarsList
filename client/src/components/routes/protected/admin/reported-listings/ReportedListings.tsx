import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import ListingCard from "../../../../ui/ListingCard"
import ReportedListingsReport from "./ReportedListingsReport"

const ReportedListings = () => {
  const { expiredListings } = useTimelineContext()

  const disputes = expiredListings.filter(
    (listing) => listing.status === "disputed"
  )

  return (
    <div className="flex flex-col w-full p-5 gap-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Disputes</h1>
      <ReportedListingsReport />
      <ul className="flex gap-8 py-8 overflow-x-auto px-8">
        {disputes.length !== 0 ? (
          disputes.map((dispute) => (
            <li key={dispute._id}>
              <ListingCard listing={dispute} />
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
