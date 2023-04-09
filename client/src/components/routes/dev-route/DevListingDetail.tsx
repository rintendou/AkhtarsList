import { useEffect } from "react"
import { useParams } from "react-router"
import useDevListingDetail from "./useDevListingDetail"

import DevActiveBiddingSection from "./DevActiveBiddingSection"
import ListingOverview from "../listing-detail/ListingOverview"
import SeeOtherListings from "../listing-detail/SeeOtherListings"
import ListingDetailSkeleton from "../listing-detail/ListingDetailSkeleton"
import DevExpiredBiddingSection from "./DevExpiredBiddingSection"

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
            <ListingOverview
              title={title}
              lister={lister}
              startPrice={startPrice}
              category={category}
              views={views}
              desc={desc}
              weight={weight}
              length={length}
              width={width}
              height={height}
            />
            {biddingSection}
          </div>
          <SeeOtherListings category={category} idToFilter={listingId!} />
        </>
      ) : (
        <ListingDetailSkeleton />
      )}
    </div>
  )
}

export default DevListingDetail
