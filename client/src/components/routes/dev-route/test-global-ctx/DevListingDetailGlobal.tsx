import useListingDetail from "./useListingDetail"

import DevActiveBiddingSection from "./DevActiveBiddingSection"
import DevExpiredBiddingSection from "./DevExpiredBiddingSection"
import DevListingOverview from "./DevListingOverview"
import DevSeeOtherListings from "./DevSeeOtherListings"
import ListingDetailSkeleton from "../../listing-detail/ListingDetailSkeleton"

const DevListingDetailGlobal = () => {
  const { isExpired, isLoading } = useListingDetail()

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="flex flex-col md:flex-row min-h-screen border-b-2 border-b-tertiary">
            <DevListingOverview />
            {isExpired ? (
              <DevExpiredBiddingSection />
            ) : (
              <DevActiveBiddingSection />
            )}
          </div>
          <DevSeeOtherListings />
        </>
      ) : (
        <ListingDetailSkeleton />
      )}
    </div>
  )
}

export default DevListingDetailGlobal
