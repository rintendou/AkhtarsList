import useTimelineContext from "../../../../../lib/hooks/context-hooks/useTimelineContext"
import Card from "../../../../ui/Card"
import ListingCard from "../../../../ui/ListingCard"
import SeeAll from "../../../application/timeline/SeeAll"

const AnalyticsDisputes = () => {
  const { expiredListings } = useTimelineContext()

  const disputes = expiredListings.filter(
    (listing) => listing.status === "disputed"
  )

  return (
    <Card twClasses="w-full p-4 shadow-lg border-4 border-secondary space-y-4">
      <div className="flex justify-between align-middle">
        <h1 className="text-2xl font-semibold">Disputes</h1>
        <SeeAll to="/admin/disputes" />
      </div>
      <ul className="flex gap-8 py-8 overflow-x-auto px-8">
        {disputes.length !== 0 ? (
          disputes.map((dispute) => (
            <li key={dispute._id}>
              <ListingCard listing={dispute}></ListingCard>
            </li>
          ))
        ) : (
          <h1>No Transactions Found!</h1>
        )}
      </ul>
    </Card>
  )
}

export default AnalyticsDisputes
