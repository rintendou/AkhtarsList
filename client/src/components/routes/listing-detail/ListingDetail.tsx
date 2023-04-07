import { useEffect } from "react"
import { useParams } from "react-router"
import useListingDetail from "../../../lib/hooks/useListingDetail"

// Assets
import SeeOtherListings from "./SeeOtherListings"
import ListingOverview from "./ListingOverview"
import ExpiredBiddingSection from "./ExpiredBiddingSection"
import ActiveBiddingSection from "./ActiveBiddingSection"
import ListingDetailSkeleton from "./ListingDetailSkeleton"

const ListingDetail = () => {
  const { listing, fetchListing, isLister, isExpired, isLoading } =
    useListingDetail()

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

  const biddingSection = isExpired ? (
    <ExpiredBiddingSection
      bidders={bidders}
      finalPrice={finalPrice}
      isLister={isLister}
    />
  ) : (
    <ActiveBiddingSection
      listing={listing}
      bidders={bidders}
      finalPrice={finalPrice}
      expireAt={expireAt}
      isLister={isLister}
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

export default ListingDetail
