import { useLocation } from "react-router"

import DUMMYIMAGE from "../../../../public/random-listing-image-undraw.svg"

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
      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center justify-between">
        <div className="space-y-10">
          <h1 className="text-3xl text-center font-semibold">{title}</h1>
          <img src={DUMMYIMAGE} alt={title} />
        </div>

        <div className="space-y-10 w-full">
          <div className="space-y-5 w-full pb-10 border-b border-gray-300">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h1>Lister: </h1>
                <p className="text-lg font-semibold">{lister}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h1>Start Price: </h1>
              <p className="text-lg font-semibold">${startPrice}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h1>Category:</h1>
                <p className="text-lg font-semibold">{category}</p>
              </div>
              <div className="flex items-center gap-3">
                <h1>Views:</h1>
                <p className="text-lg font-semibold">{views} bidders so far</p>
              </div>
            </div>
          </div>

          <div className="pb-10 border-b border-b-gray-300">
            <h1>Description: </h1>
            <p className="font-semibold text-lg indent-10">{desc}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <h1>Weight:</h1>
              <p className="text-lg font-semibold">{weight} kg</p>
            </div>

            <div className="flex gap-3 items-center">
              <h1>Dimensions: </h1>
              <div className="flex items-center gap-3">
                <h1>H:</h1>
                <p className="text-lg font-semibold">{dimensions[0]} cm </p>
              </div>
              <div className="flex items-center gap-3">
                <h1>L:</h1>
                <p className="text-lg font-semibold">{dimensions[1]} cm </p>
              </div>
              <div className="flex items-center gap-3">
                <h1>W:</h1>
                <p className="text-lg font-semibold">{dimensions[2]} cm </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center bg-purple-100">
        <h1 className="text-3xl text-center font-semibold">Biddings</h1>
        <div className="flex justify-between w-full">
          <p className="text-xl">Final Price: ${finalPrice}</p>
          <p className="text-xl">Expires At: {expireAt}</p>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail
