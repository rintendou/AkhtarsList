import ImageContainer from "../sell/ImageContainer"

type Props = {
  title: string
  lister: string
  desc: string
  image: string
  startPrice: number
  expireAt: Date
  category: string
  weight: number
  dimension: [number, number, number]
  // height, width, length
}

const Preview = ({
  title,
  lister,
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
      <ImageContainer />
      <div>
        <h1 className="text-4xl font-bold text-center w-full py-10 tracking-wide">
          Listing Successfully Posted!
        </h1>
        <div className="flex flex-col space-y-10">
          <div>
            <h1 className="text-lg font-semibold">Listing Overview</h1>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Listing Expiration</h1>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Listing Dimensions</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
