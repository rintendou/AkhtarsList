import useProfileContext from "../../../../../lib/hooks/context-hooks/useProfileContext"
import Card from "../../../../ui/Card"
import ListingCard from "../../../../ui/ListingCard"
import SeeAll from "../../../application/timeline/SeeAll"

const AnalyticsReported = () => {
  const { reportedListings } = useProfileContext()

  return (
    <Card twClasses="w-full p-4 shadow-lg border-4 border-secondary space-y-4 dark:bg-black dark:border-4 dark:border-tertiary">
      <div className="flex justify-between align-middle">
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
