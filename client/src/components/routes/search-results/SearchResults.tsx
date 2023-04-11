import { Link, useLocation } from "react-router-dom"
import Carousel from "../../ui/Carousel"
import CategoryHeader from "../application/CategoryHeader"
import Results from "./Results"

const IMAGESET2 = [
  "sneakers2.jpg",
  "antiques2.jpg",
  "tech2.jpg",
  "accessories2.jpg",
  "collectibles2.jpg",
  "assorted2.jpg",
]

const BUYSELLIMAGE = "timeline/buy-sell.jpg"

const SearchResults = () => {
  const location = useLocation()

  console.log(location.state!)
  const searchResults = location.state!.searchResults
  const query = location.state!.query

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <CategoryHeader />
      <div className="container mx-auto flex flex-col gap-5">
        <div className="px-10 py-10 bg-purple-100 rounded-md shadow-md">
          <h1 className="text-3xl capitalize font-bold">Search Results</h1>
        </div>
        <h1 className="font-light">
          You searched for: <p className="inline font-semibold">{query}</p>
        </h1>
        <Results searchResults={searchResults} />
        <div className="mb-10">
          <Carousel images={IMAGESET2} />
        </div>
        <Link to={"/sell"}>
          <img
            src={BUYSELLIMAGE}
            alt="Bid and List"
            className="h-64 object-cover mt-10 cursor-pointer w-full"
          />
        </Link>
      </div>
    </div>
  )
}

export default SearchResults
