import { useEffect } from "react"

// Assets
import SeeOtherListings from "./SeeOtherListings"
import ListingOverview from "./ListingOverview"
import ExpiredBiddingSection from "./ExpiredBiddingSection"
import ActiveBiddingSection from "./ActiveBiddingSection"
import ListingDetailSkeleton from "./ListingDetailSkeleton"
import useListingDetailContext from "./useListingDetailContext"

const ListingDetail = () => {
  const { isExpired, isLoading } = useListingDetailContext()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  const biddingSection = isExpired ? (
    <ExpiredBiddingSection />
  ) : (
    <ActiveBiddingSection />
  )

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="flex flex-col md:flex-row min-h-screen border-b-2 border-b-tertiary">
            <ListingOverview />
            {biddingSection}
          </div>
          <SeeOtherListings />
        </>
      ) : (
        <ListingDetailSkeleton />
      )}
    </div>
  )
}

export default ListingDetail
