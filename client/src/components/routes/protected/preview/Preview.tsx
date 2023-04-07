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
  const dimensions = location.state!.dimensions
  const message = location.state!.message

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <h1 className="text-4xl font-bold text-center w-full tracking-wide py-10">
        {message}
      </h1>
      <PreviewImageContainer img={image} title={title} />
      <div className="bg-purple-100 p-10 md:p-20 md:pt-10">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-semibold text-center w-full">
            Listing Preview
          </h1>
          <div className="pb-10 border-b border-gray-300">
            <h1 className="text-lg font-semibold">Listing Overview</h1>
            <p>Description: {desc}</p>
            <p>Category: {category || "General"}</p>
            <p>Starting Price: ${startPrice}</p>
          </div>
          <div className="pb-10 border-b border-gray-300">
            <h1 className="text-lg font-semibold">Listing Expiration</h1>
            <p>Expiration Date and Time: {expireAt.toString()}</p>
          </div>
          <div className="pb-10 border-b border-gray-300">
            <h1 className="text-lg font-semibold">Listing Dimensionss</h1>
            <p>Weight: {weight} kg</p>
            <div>
              <p>Height: {dimensions[0]} cm</p>
              <p>Width: {dimensions[1]} cm</p>
              <p>Length: {dimensions[2]} cm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
