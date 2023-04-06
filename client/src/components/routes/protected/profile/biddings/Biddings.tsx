import useProfile from "../../../../../lib/hooks/useProfile"

import ListingCard from "../../../../ui/ListingCard"
import BidMore from "./BidMore"

const Biddings = () => {
  const { biddings } = useProfile()

  return (
    <div>
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Biddings</h1>
      <ul className="flex gap-8 py-8 overflow-x-auto">
        <BidMore />
        {biddings.length !== 0 &&
          biddings.map((bidding) => (
            <li key={bidding._id}>
              <ListingCard
                _id={bidding._id}
                image={bidding.image}
                title={bidding.title}
                finalPrice={bidding.finalPrice}
                expireAt={bidding.expireAt}
                views={bidding.views}
                bidders={bidding.bidders}
                lister={bidding.lister}
                desc={bidding.desc}
                startPrice={bidding.startPrice}
                category={bidding.category}
                weight={bidding.weight}
                dimensions={bidding.dimensions}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Biddings
