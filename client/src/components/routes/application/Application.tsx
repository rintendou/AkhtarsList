import Carousel from "../../ui/Carousel"
import CategoryHeader from "./CategoryHeader"

const Application = () => {
  return (
    <div className="min-h-screen flex flex-col container mx-auto">
      <CategoryHeader />
      <Carousel />
    </div>
  )
}

export default Application
