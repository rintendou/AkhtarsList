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
    <Card twClasses="w-full h-64 shadow-lg border-2 border-secondary dark:bg-black dark:border-tertiary">
      <h1 className="text-2xl font-semibold p-4 bg-secondary dark:bg-black dark:border-b-2 dark:border-tertiary text-primary">
        Disputes Report
      </h1>
      <ScrollToTop />
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <p>Total Price of Disputes: ${totalPrice}</p>
          <p>Total Disputed Listings: {disputes.length}</p>
        </div>
      </div>
    </Card>
  )
}

export default DisputesReport
