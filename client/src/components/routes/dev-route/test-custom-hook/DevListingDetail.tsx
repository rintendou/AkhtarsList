import { useEffect } from "react"
import { useParams } from "react-router"
import useDevListingDetail from "./useDevListingDetail"

import DevActiveBiddingSection from "./DevActiveBiddingSection"
import DevExpiredBiddingSection from "./DevExpiredBiddingSection"
import ListingOverview from "../test-nonpolled/ListingOverview"
import SeeOtherListings from "../test-nonpolled/SeeOtherListings"
import ListingDetailSkeleton from "../test-nonpolled/ListingDetailSkeleton"

const DevListingDetail = () => {
  const { listing, isLister, isExpired, isLoading, timeRemaining } =
    useDevListingDetail()

  const {
    image,
    bidders,
    lister,
    desc,
    title,
    startPrice,
    finalPrice,
    expireAt,
    views,
    category,
    weight,
    dimensions,
    height,
    width,
    length,
  } = listing

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  const { listingId } = useParams()

  const biddingSection = isExpired ? (
    <DevExpiredBiddingSection
      bidders={bidders}
      finalPrice={finalPrice}
      isLister={isLister}
    />
  ) : (
    <DevActiveBiddingSection
      listing={listing}
      bidders={bidders}
      finalPrice={finalPrice}
      expireAt={expireAt}
      isLister={isLister}
      timeRemaining={timeRemaining}
    />
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

export default DevListingDetail
