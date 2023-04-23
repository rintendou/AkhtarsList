import CurrentBiddings from "./CurrentBiddings"
import DisputedBiddings from "./DisputedBiddings"
import AllBiddings from "./AllBiddings"
import WonBiddings from "./WonBiddings"
import FulfilledBiddings from "./FulfilledBiddings"
import BiddingsOverview from "./BiddingsOverview"

const Biddings = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <BiddingsOverview />
      <WonBiddings />
      <CurrentBiddings />
      <FulfilledBiddings />
      <DisputedBiddings />
      <AllBiddings />
    </div>
  )
}

export default Biddings
