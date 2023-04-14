// Assets
import SeeOtherListings from "./SeeOtherListings"
import ListingOverview from "./ListingOverview"
import ExpiredBiddingSection from "./ExpiredBiddingSection"
import ActiveBiddingSection from "./ActiveBiddingSection"
import ListingDetailSkeleton from "./ListingDetailSkeleton"
import useListingDetailContextQuery from "../../../lib/hooks/useListingDetailContext"

const ListingDetail = () => {
  const { data, isLoading } = useListingDetailContextQuery()

  if (isLoading) {
    return <ListingDetailSkeleton />
  }

  const { data: listing } = data

  const isExpired = listing && new Date(listing.expireAt) < new Date()

  const biddingSection = isExpired ? (
    <ExpiredBiddingSection />
  ) : (
    <ActiveBiddingSection />
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen border-b-2 border-b-tertiary">
        <ListingOverview />
        {biddingSection}
      </div>
      <SeeOtherListings />
    </div>
  )
}

export default ListingDetail
