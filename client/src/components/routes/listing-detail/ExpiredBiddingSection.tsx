// Components
import Bidders from "./Bidders"

type Props = {
  bidders: string[]
  finalPrice: number
  isLister: boolean
}

const ExpiredBiddingSection = ({ bidders, finalPrice, isLister }: Props) => {
  return (
    <div
      className={`flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100 opacity-40 select-none`}
    >
      <h1 className="text-5xl text-center font-semibold opacity-100">
        Listing Expired
      </h1>

      <h1 className="text-3xl text-center font-semibold backdrop-opacity-30">
        Biddings
      </h1>

      <div className="flex justify-between w-full">
        <div className="flex items-center gap-3">
          <h1>Final Price:</h1>
          <p className="text-lg font-semibold"> ${finalPrice}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold truncate">Expired</p>
        </div>
      </div>

      <div className="text-3xl font-semibold underline">
        You own this listing
      </div>

      <Bidders bidders={bidders} isLister={isLister} />
    </div>
  )
}

export default ExpiredBiddingSection
