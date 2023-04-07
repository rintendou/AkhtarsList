import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import useListingDetail from "../../../lib/hooks/useListingDetail"

// Util functions
import getTimeRemaining from "../../../lib/util/getTimeRemaining"

// Assets
import SeeOtherListings from "./SeeOtherListings"
import ListingOverview from "./ListingOverview"
import ExpiredBiddingSection from "./ExpiredBiddingSection"
import ActiveBiddingSection from "./ActiveBiddingSection"

const ListingDetail = () => {
  const { listing, fetchListing, isLister, isExpired } = useListingDetail()

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

  const { listingId } = useParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    fetchListing(listingId!)
  }, [listingId])

  return (
    <div>
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

        {isExpired ? (
          <ExpiredBiddingSection
            bidders={bidders}
            finalPrice={finalPrice}
            isLister={isLister}
          />
        ) : (
          <ActiveBiddingSection
            bidders={bidders}
            finalPrice={finalPrice}
            expireAt={expireAt}
            isLister={isLister}
          />
        )}
      </div>
      <SeeOtherListings category={category} idToFilter={listingId!} />
    </div>
  )
}

export default ListingDetail
