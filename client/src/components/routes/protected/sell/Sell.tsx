import ImageContainer from "./ImageContainer"
import SellActions from "./SellActions"

const Sell = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ImageContainer />
      <SellActions />
    </div>
  )
}

export default Sell
