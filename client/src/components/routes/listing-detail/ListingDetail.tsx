// Hooks
import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"

// Assets
import SeeOtherListings from "./SeeOtherListings"
import ListingOverview from "./ListingOverview"
import ExpiredBiddingSection from "./ExpiredBiddingSection"
import ActiveBiddingSection from "./ActiveBiddingSection"
import FixedScrollToTop from "../../ui/FixedScrollToTop"

const ListingDetail = () => {
  const { data } = useListingDetailContextQuery()

  const { data: listing } = data

  const isExpired = listing && new Date(listing.expireAt) < new Date()

  const biddingSection = isExpired ? (
    <ExpiredBiddingSection />
  ) : (
    <ActiveBiddingSection />
  )

  return (
    <div className="relative">
      <FixedScrollToTop />
      <div className="flex flex-col md:flex-row min-h-screen border-b-2 border-b-tertiary dark:bg-black">
        <ListingOverview />
        {biddingSection}
      </div>
      <SeeOtherListings />
    </div>
  )
}

export default ListingDetail
