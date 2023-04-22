import useAuthContext from "../../../../lib/hooks/context-hooks/useAuthContext"
import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import Card from "../../../ui/Card"

const ListingsOverview = () => {
  const { listings } = useProfileContext()

  const activelistings = listings.filter(
    (listing) => new Date(listing.expireAt) > new Date()
  )

  const expiredlistings = listings.filter(
    (listing) => new Date(listing.expireAt) < new Date()
  )

  const listingsToFulfill = expiredlistings.filter(
    (listing) => listing.bestBidder
  )

  const pendingListingsToFulfill = listingsToFulfill.filter(
    (listing) => listing.status === "expired"
  )

  const disputedListingsToFulfill = listingsToFulfill.filter(
    (listing) => listing.status === "disputed"
  )

  const unsuccessfulListings = expiredlistings.filter(
    (listing) => !listing.bestBidder
  )

  return (
    <Card twClasses="w-full p-4 shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Listings Overview</h1>
      <div className="space-y-2">
        <p>Total Listings: {listings.length}</p>
        <p className="text-xs text-gray-600">
          - Active Listings: {activelistings.length}
        </p>
        <p className="text-xs text-gray-600">
          - Expired Listings: {expiredlistings.length}
        </p>
      </div>
      <div className="space-y-2">
        <p>Total Listings to Fulfill: {listingsToFulfill.length}</p>
        <p className="text-xs text-gray-600">
          - Pending Listings: {pendingListingsToFulfill.length}
        </p>
        <p className="text-xs text-gray-600">
          - Disputed Listings: {disputedListingsToFulfill.length}
        </p>
      </div>
      <p>Total Unsuccessful Listings: {unsuccessfulListings.length}</p>
    </Card>
  )
}

export default ListingsOverview
