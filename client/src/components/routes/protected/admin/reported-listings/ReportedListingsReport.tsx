import useProfileContext from "../../../../../lib/hooks/context-hooks/useProfileContext"
import Card from "../../../../ui/Card"

const ReportedListingsReport = () => {
  const { reportedListings } = useProfileContext()

  const totalPrice = reportedListings.reduce(
    (total, listing) => (total += listing.finalPrice),
    0
  )

  return (
    <Card twClasses="w-full p-4 h-64 shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Flagged Listings Report</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Total Price of Reported Listings: ${totalPrice}</p>
          <p>Total Reported Listings: {reportedListings.length}</p>
        </div>
      </div>
    </Card>
  )
}

export default ReportedListingsReport
