import { useLocation } from "react-router-dom"
import PreviewImageContainer from "./PreviewImageContainer"

const Preview = () => {
  const location = useLocation()

  const title = location.state!.title
  const desc = location.state!.desc
  const image = location.state!.image
  const startPrice = location.state!.startPrice
  const expireAt = location.state!.expireAt
  const category = location.state!.category
  const weight = location.state!.weight
  const dimension = location.state!.dimension

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <PreviewImageContainer img={image} title={title} />
      <div className="max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none">
        <h1 className="text-4xl font-bold text-center w-full py-10 tracking-wide">
          Listing Successfully Posted!
        </h1>
        <div className="flex flex-col space-y-10">
          <div>
            <h1 className="text-lg font-semibold">Listing Overview</h1>
            <p>Description: {desc}</p>
            <p>Category: {category || "General"}</p>
            <p>Starting Price: {startPrice}</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Listing Expiration</h1>
            <p>Expiration Date and Time: {expireAt.toString()}</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Listing Dimensions</h1>
            <p>Weight: {weight} kg</p>
            <div>
              <p>Height: {dimension[0]}</p>
              <p>Width: {dimension[1]}</p>
              <p>Length: {dimension[2]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
