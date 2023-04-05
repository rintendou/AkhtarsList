import Carousel from "../../ui/Carousel"
import CategoryHeader from "./CategoryHeader"
import Timeline from "./timeline/Timeline"

const IMAGESET1 = [
  "sneakers1.jpg",
  "antiques1.jpg",
  "tech1.jpg",
  "accessories1.jpg",
  "collectibles1.jpg",
  "assorted1.jpg",
]

const IMAGESET2 = [
  "sneakers.jpg",
  "antiques.jpg",
  "tech.jpg",
  "accessories.jpg",
  "collectibles.jpg",
  "assorted.jpg",
]

const Application = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CategoryHeader />
      <div className="container mx-auto flex flex-col gap-5">
        <Carousel images={IMAGESET1} />
        <Timeline />
      </div>
    </div>
  )
}

export default Application
