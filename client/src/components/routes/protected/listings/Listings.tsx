import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import Card from "../../../ui/Card"
import ListingCard from "../../../ui/ListingCard"
import RouterLink from "../../../ui/RouterLink"

const Listings = () => {
  const { wonListings } = useProfileContext()

  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <ul className="flex gap-8 py-8 flex-wrap">
        {wonListings.length !== 0 ? (
          wonListings.map((wonListing) => (
            <li key={wonListing._id}>
              <ListingCard listing={wonListing} />
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

export default Listings
