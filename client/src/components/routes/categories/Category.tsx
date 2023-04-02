import { useParams } from "react-router-dom"

import SideNavLinks from "./SideNavLinks"

const Category = () => {
  const { categoryName } = useParams()

  return (
    <div className="min-h-screen flex flex-col container mx-auto py-5">
      <div className="px-10 py-10 bg-slate-200 rounded-md shadow-md">
        <h1 className="text-3xl capitalize font-bold">{categoryName}</h1>
      </div>
      <SideNavLinks />
    </div>
  )
}

export default Category
