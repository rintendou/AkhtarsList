import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"
import getFormattedDate from "../../../lib/util/functions/getFormattedDate"
import getNumberWithCommas from "../../../lib/util/functions/getNumberWithCommas"

// Assets
import noImageFound from "/no-image-found-undraw.svg"

const ListingOverview = () => {
  const { data } = useListingDetailContextQuery()
  const { data: listing } = data
  const {
    title,
    listerUsername,
    image,
    startPrice,
    category,
    views,
    desc,
    weight,
    dimensions,
    expireAt,
  } = listing

  return (
    <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 flex flex-col items-center justify-between">
      <div className="space-y-10">
        <h1 className="text-5xl text-center font-semibold">{title}</h1>
        <img
          src={image.length !== 0 ? image : noImageFound}
          alt={title}
          className="w-screen h-max object-cover"
        />
      </div>
      <div className="space-y-10 w-full">
        <div className="space-y-5 w-full pb-10 border-b border-gray-300">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <h1>Lister: </h1>
              <p className="text-lg font-semibold">{listerUsername}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h1>Start Price: </h1>
            <p className="text-lg font-semibold">
              ${getNumberWithCommas(startPrice)}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <h1>Category:</h1>
              <p className="text-lg font-semibold">{category}</p>
            </div>
            <div className="flex items-center gap-3">
              <h1>Views:</h1>
              <p className="text-lg font-semibold">
                {getNumberWithCommas(views)}
              </p>
            </div>
          </div>
        </div>
        <div className="pb-10 border-b border-b-gray-300">
          <h1>Description: </h1>
          <p className="font-semibold text-lg indent-10">{desc}</p>
        </div>
        <div className="flex flex-col xl:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <h1>Weight:</h1>
            <p className="text-lg font-semibold truncate">{weight} kg</p>
          </div>
          <div className="flex gap-3 items-center">
            <h1>Dimensions: </h1>

            <div className="flex items-center gap-3">
              <h1>H:</h1>
              <p className="text-lg font-semibold truncate">
                {dimensions[0]} cm
              </p>
            </div>
            <div className="flex items-center gap-3">
              <h1>W:</h1>
              <p className="text-lg font-semibold truncate">
                {dimensions[1]} cm
              </p>
            </div>
            <div className="flex items-center gap-3">
              <h1>L:</h1>
              <p className="text-lg font-semibold truncate">
                {dimensions[2]} cm
              </p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-3">
            <h1>Expiration Date:</h1>
            <p className="text-lg font-semibold">
              {getFormattedDate(expireAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingOverview
