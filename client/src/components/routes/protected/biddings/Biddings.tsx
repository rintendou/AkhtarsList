import CurrentBiddings from "./CurrentBiddings"
import DisputedBiddings from "./DisputedBiddings"
import ExpiredBiddings from "./ExpiredBiddings"
import WonBiddings from "./WonBiddings"

const Biddings = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <WonBiddings />
      <CurrentBiddings />
      <DisputedBiddings />
      <ExpiredBiddings />
    </div>
  )
}

export default Biddings
