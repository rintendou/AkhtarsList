import CurrentBiddings from "./CurrentBiddings"
import DisputedBiddings from "./DisputedBiddings"
import ExpiredBiddings from "./ExpiredBiddings"

const Biddings = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-10 text-xl">
      <DisputedBiddings />
      <CurrentBiddings />
      <ExpiredBiddings />
    </div>
  )
}

export default Biddings
