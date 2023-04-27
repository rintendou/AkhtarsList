import useProfileContext from "../../../../../lib/hooks/context-hooks/useProfileContext"
import Card from "../../../../ui/Card"
import ListingCard from "../../../../ui/ListingCard"
import SeeAll from "../../../application/timeline/SeeAll"

const AnalyticsReported = () => {
  const { reportedListings } = useProfileContext()

  return (
    <Card twClasses="w-full shadow-lg border-2 border-secondary dark:bg-black dark:border-tertiary">
      <div className="flex justify-between align-middle p-4 bg-secondary text-primary dark:bg-black dark:border-b-2 dark:border-tertiary">
        <h1 className="text-2xl font-semibold">Reported Listings</h1>
        <SeeAll to="/admin/disputes" />
      </div>
      <ul className="flex gap-8 py-8 overflow-x-auto px-8">
        {reportedListings.length !== 0 ? (
          reportedListings.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing}></ListingCard>
            </li>
          ))
        ) : (
          <h1>No Reported Listings Found!</h1>
        )}
      </ul>
    </Card>
  )
}

export default AnalyticsReported
