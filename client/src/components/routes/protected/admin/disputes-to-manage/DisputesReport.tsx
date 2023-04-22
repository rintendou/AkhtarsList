import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import ScrollToTop from "../../../../../lib/util/components/ScrollToTop"
import Card from "../../../../ui/Card"

const DisputesReport = () => {
  const { expiredListings } = useTimelineContext()

  const disputes = expiredListings.filter(
    (listing) => listing.status === "disputed"
  )

  const totalPrice = disputes.reduce(
    (total, dispute) => (total += dispute.finalPrice),
    0
  )

  return (
    <Card twClasses="w-full p-4 h-64 shadow-lg border-4 border-secondary space-y-4">
      <ScrollToTop />
      <h1 className="text-2xl font-semibold">Disputes Report</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Total Price of Disputes: ${totalPrice}</p>
          <p>Total Disputed Listings: {disputes.length}</p>
        </div>
      </div>
    </Card>
  )
}

export default DisputesReport
