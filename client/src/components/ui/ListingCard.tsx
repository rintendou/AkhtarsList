import { Link, useNavigate } from "react-router-dom"
import Card from "./Card"

type Props = {
  _id: string
  img: string
  title: string
  price: number
  timeRemaining: string
  views: number
}

const ListingCard = ({
  _id,
  img,
  title,
  price,
  timeRemaining,
  views,
}: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/listings/${_id}`, {
      state: { _id, img, title, price, timeRemaining, views },
    })
  }

  return (
    <Card twClasses="p-2 w-56 text-sm h-76 justify-between cursor-pointer hover:shadow-xl duration-100 ease-in-out">
      <div className="flex flex-col gap-1" onClick={handleClick}>
        <img
          src="https://picsum.photos/200/300"
          alt={title}
          className="h-36 w-auto rounded-md"
        />
        <h1 className="text-lg font-light">{title}</h1>
        <p className="text-gray-500">Current Price:</p>
        <p className="font-bold text-2xl">${price}</p>
        <div className="flex justify-between">
          <p className="bg-gray-200 p-1 rounded md w-min whitespace-nowrap">
            Views: {views}
          </p>
          <p className="bg-gray-200 p-1 rounded md w-min whitespace-nowrap">
            Expires In: {timeRemaining.toString()}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default ListingCard
