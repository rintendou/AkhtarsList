import { useLocation } from "react-router"

const ListingDetail = () => {
  const location = useLocation()

  const { _id, img, title, price, timeRemaining, views } = location.state

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-auto p-10 py-24 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 font-semibold flex flex-col items-center justify-between">
        <div className="space-y-10">
          <h1 className="text-3xl text-center">{title}</h1>
          <img src={img} alt={title} />
        </div>
        <div className="space-y-5 text-left">
          <p className="text-xl">Price: ${price}</p>
          <p className="text-xl">Views: ${views}</p>
        </div>
      </div>
      <div className="flex-auto p-10 py-20 max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none space-y-10 font-semibold flex flex-col items-center justify-between">
        <h1 className="text-3xl text-center">Biddings</h1>
      </div>
    </div>
  )
}

export default ListingDetail
