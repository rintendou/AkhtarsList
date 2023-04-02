import Card from "./Card"

type Props = {
  img: string
  title: string
  price: number
  timeRemaining: Date
  views: number
}

const ListingCard = ({ img, title, price, timeRemaining, views }: Props) => {
  return (
    <Card twClasses="p-2 w-56 text-sm h-72 flex flex-col justify-between cursor-pointer hover:shadow-xl duration-100 ease-in-out">
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
          Remaining Time: {views}
        </p>
      </div>
    </Card>
  )
}

export default ListingCard
