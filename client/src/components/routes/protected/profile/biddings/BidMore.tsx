import { useNavigate } from "react-router-dom"
import Card from "../../../../ui/Card"

const BidMore = () => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/")}>
      <Card twClasses="p-2 w-56 h-76 flex flex-col justify-between opacity-50 cursor-pointer hover:scale-105 duration-200 ease-in-out">
        <div className="h-48 w-auto rounded-md bg-gray-400 mb-4 flex items-center justify-center">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="4em"
            width="4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
          </svg>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-400 rounded w-3/4 "></div>
          <div className="h-3 bg-gray-400 rounded w-1/2 "></div>
          <div className="h-3 bg-gray-400 rounded w-2/3 "></div>
          <div className="h-3 bg-gray-400 rounded w-1/3 "></div>
          <div className="flex justify-between">
            <div className="bg-gray-400 p-1 rounded md  w-1/3  "></div>
            <div className="bg-gray-400 p-1 rounded md  w-1/3  "></div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BidMore
