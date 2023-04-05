import Carousel from "../../ui/Carousel"
import ListingSkeletons from "../../ui/ListingSkeletons"
import CategoryHeader from "./CategoryHeader"
import Timeline from "./timeline/Timeline"

const Application = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CategoryHeader />
      <ListingSkeletons />
      <div className="container mx-auto flex flex-col gap-5">
        <Carousel />
        <Timeline />
      </div>
    </div>
  )
}

export default Application
