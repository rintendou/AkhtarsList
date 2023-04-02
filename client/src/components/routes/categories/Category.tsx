import { useParams } from "react-router-dom"

const Category = () => {
  const { category } = useParams()
  console.log(category)
  return <div>Category</div>
}

export default Category
