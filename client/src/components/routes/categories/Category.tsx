import { useParams } from "react-router-dom"

const Category = () => {
  const { categoryName } = useParams()

  return <div className="min-h-screen flex flex-col">{categoryName}</div>
}

export default Category
