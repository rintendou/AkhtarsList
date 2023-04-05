import Carousel from "../../ui/Carousel"
import CategoryHeader from "./CategoryHeader"

const Application = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CategoryHeader />
      <div className="container mx-auto">
        <Carousel />
      </div>
    </div>
  )
}

export default Application
