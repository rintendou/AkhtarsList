import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import Card from "../../../../ui/Card"

const AnalyticsReport = () => {
  const { allListings, expiredListings, unexpiredListings } =
    useTimelineContext()

  const pendingListings = expiredListings.filter(
    (listing) => listing.status === "expired"
  )
  const disputedListings = expiredListings.filter(
    (listing) => listing.status === "disputed"
  )

  return (
    <Card twClasses="w-full p-4 h-full shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Report</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Total Listings: {allListings.length}</p>
          <p className="text-xs text-gray-600">
            {" "}
            - Active Listings: {unexpiredListings.length}
          </p>
          <p className="text-xs text-gray-600">
            {" "}
            - Expired Listings: {expiredListings.length}
          </p>
        </div>
        <p>Pending Listings: {pendingListings.length}</p>
        <p>Pending Disputes: {disputedListings.length}</p>
      </div>
    </Card>
  )
}

export default AnalyticsReport
