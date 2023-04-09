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
  const { listing, isLister, isExpired, isLoading } = useListingDetail()

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

  const { listingId } = useParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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
              _id={listingId!}
              image={image}
              title={title}
              finalPrice={finalPrice}
              expireAt={expireAt}
              views={views}
              bidders={bidders}
              lister={lister}
              desc={desc}
              startPrice={startPrice}
              category={category}
              weight={weight}
              dimensions={dimensions}
              height={height}
              width={width}
              length={length}
            />
            {biddingSection}
          </div>
          <SeeOtherListings category={category} idToFilter={listing._id!} />
        </>
      ) : (
        <ListingDetailSkeleton />
      )}
    </div>
  )
}

export default ListingDetail
