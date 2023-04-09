import useProfile from "../../../../lib/hooks/useProfile"
import Card from "../../../ui/Card"
import ListingCard from "../../../ui/ListingCard"
import RouterLink from "../../../ui/RouterLink"

const WonListings = () => {
  const { wonListings } = useProfile()

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ul className="flex gap-8 py-8 flex-wrap">
        {wonListings.length !== 0 ? (
          wonListings.map((wonListing) => (
            <li key={wonListing._id}>
              <ListingCard
                _id={wonListing._id}
                image={wonListing.image}
                title={wonListing.title}
                finalPrice={wonListing.finalPrice}
                expireAt={wonListing.expireAt}
                views={wonListing.views}
                bidders={wonListing.bidders}
                lister={wonListing.lister}
                desc={wonListing.desc}
                startPrice={wonListing.startPrice}
                category={wonListing.category}
                weight={wonListing.weight}
                dimensions={wonListing.dimensions}
                height={wonListing.height}
                width={wonListing.width}
                length={wonListing.length}
              />
            </li>
          ))
        ) : (
          <Card twClasses="p-10 md:p-20 text-center">
            <h1 className="text-2xl font-semibold">
              You have not won any listings yet
            </h1>

            <h1 className="font-extralight">
              Click{" "}
              <RouterLink to="/" routerLinkText="here" twClasses="underline" />{" "}
              to bid on listings
            </h1>
          </Card>
        )}
      </ul>
    </div>
  )
}

export default WonListings
