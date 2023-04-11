import { Link } from "react-router-dom"
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
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <CategoryHeader />
      <div className="container mx-auto flex flex-col gap-5">
        <Results />
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
