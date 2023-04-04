import PreviewImageContainer from "./PreviewImageContainer"

type Props = {
  title: string
  lister: string
  desc: string
  image: string
  startPrice: number
  expireAt: Date
  category: string
  weight: number
  dimension: [height: number, width: number, length: number]
  // height, width, length
}

const Preview = ({
  title,
  desc,
  image,
  startPrice,
  expireAt,
  category = "General",
  weight,
  dimension,
}: Props) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <PreviewImageContainer img={image} title={title} />
      <div>
        <h1 className="text-4xl font-bold text-center w-full py-10 tracking-wide">
          Listing Successfully Posted!
        </h1>
        <div className="flex flex-col space-y-10">
          <div>
            <h1 className="text-lg font-semibold">Listing Overview</h1>
            <p>Description: {desc}</p>
            <p>Category: {category}</p>
            <p>Starting Price: {startPrice}</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Listing Expiration</h1>
            <p>Expiration Date and Time: {expireAt.toISOString()}</p>
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
