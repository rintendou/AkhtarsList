import { useEffect } from "react"
import useTimeline from "../../../lib/hooks/useTimeline"
import Carousel from "../../ui/Carousel"
import CategoryHeader from "./CategoryHeader"
import Timeline from "./timeline/Timeline"
import { Link } from "react-router-dom"

const BUYSELLIMAGE = "timeline/buy-sell.jpg"

const IMAGESET1 = [
  "sneakers1.jpg",
  "antiques1.jpg",
  "tech1.jpg",
  "accessories1.jpg",
  "collectibles1.jpg",
  "assorted1.jpg",
]

const Application = () => {
  const { refetchTimeline } = useTimeline()

  // Refresh timeline and scroll to top on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    refetchTimeline()
  }, [])

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <CategoryHeader />
      <div className="container mx-auto flex flex-col gap-5">
        <div className="mb-10">
          <Carousel images={IMAGESET1} />
        </div>
        <Timeline />
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

export default Application
