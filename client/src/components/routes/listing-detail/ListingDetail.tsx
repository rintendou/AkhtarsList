import { useLocation } from "react-router"

const ListingDetail = () => {
  const location = useLocation()

  const {
    _id,
    image,
    bidders,
    lister,
    desc,
    title,
    startPrice,
    finalPrice,
    expireAt,
    views,
    category,
    weight,
    dimensions,
  } = location.state

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 font-semibold flex flex-col items-center justify-between">
        <div className="space-y-10">
          <h1 className="text-3xl text-center">{title}</h1>
          <img src={image} alt={title} />
        </div>
        <div className="space-y-5 text-left">
          <div className="flex justify-between">
            <p className="text-xl">Lister: {lister}</p>
            <p className="text-xl">Starting Price: ${startPrice}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-xl">Category: ${category}</p>
            <p className="text-xl">Views: ${views}</p>
          </div>
          <p>{desc}</p>
          <h1>Weight: {weight} kg</h1>
          <h1>
            Dimensions: H: {dimensions[0]} cm L: {dimensions[1]} cm W:{" "}
            {dimensions[2]} cm
          </h1>
        </div>
      </div>
      <div className="flex-auto p-10 py-20 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 font-semibold flex flex-col items-center">
        <h1 className="text-3xl text-center">Biddings</h1>
        <div className="flex justify-between">
          <p className="text-xl">Final Price: ${finalPrice}</p>
          <p className="text-xl">Expires At: {expireAt}</p>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail
