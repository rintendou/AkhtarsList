import useProfile from "../../../../lib/hooks/useProfile"
import Card from "../../../ui/Card"
import ListingCard from "../../../ui/ListingCard"

const DisputedListings = () => {
  const { disputedListings } = useProfile()

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card twClasses="text-center p-10 md:p-20 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <ul className="flex gap-8 py-8 flex-wrap">
          {disputedListings.length !== 0 ? (
            disputedListings.map((disputedListing) => (
              <li key={disputedListing._id}>
                <ListingCard
                  _id={disputedListing._id}
                  image={disputedListing.image}
                  title={disputedListing.title}
                  finalPrice={disputedListing.finalPrice}
                  expireAt={disputedListing.expireAt}
                  views={disputedListing.views}
                  bidders={disputedListing.bidders}
                  lister={disputedListing.lister}
                  desc={disputedListing.desc}
                  startPrice={disputedListing.startPrice}
                  category={disputedListing.category}
                  weight={disputedListing.weight}
                  dimensions={disputedListing.dimensions}
                  height={disputedListing.height}
                  width={disputedListing.width}
                  length={disputedListing.length}
                />
              </li>
            ))
          ) : (
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold">
                Great! There has not any been disputed listings that you have
                won
              </h1>

              <h1 className="font-extralight">
                Your disputed listings will be here
              </h1>
            </div>
          )}
        </ul>
      </Card>
    </div>
  )
}

export default DisputedListings
