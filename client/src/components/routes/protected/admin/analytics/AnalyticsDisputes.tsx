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
    <Card twClasses="w-full shadow-lg border-2 border-secondary dark:bg-black dark:border-tertiary">
      <div className="flex justify-between align-middle p-4 bg-secondary text-primary dark:bg-black dark:border-b-2 dark:border-tertiary">
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
          <h1>No Disputes Found!</h1>
        )}
      </ul>
    </Card>
  )
}

export default AnalyticsDisputes
