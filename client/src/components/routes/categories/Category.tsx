import { useParams } from "react-router-dom"

import RouterLink from "../../ui/RouterLink"

const Category = () => {
  const { categoryName } = useParams()

  return (
    <div className="min-h-screen flex flex-col container mx-auto py-5">
      <div className="px-10 py-10 bg-slate-200 rounded-md shadow-md">
        <h1 className="text-3xl capitalize font-bold">{categoryName}</h1>
      </div>
      <div className="p-5 flex flex-col gap-2 uppercase">
        <RouterLink
          routerLinkText="Sneakers"
          to="/category/sneakers"
          twClasses="text-lg"
        />
        <RouterLink
          routerLinkText="Antiques"
          to="/category/antiques"
          twClasses="text-lg"
        />
        <RouterLink
          routerLinkText="Tech"
          to="/category/tech"
          twClasses="text-lg"
        />
        <RouterLink
          routerLinkText="Accessories"
          to="/category/accessories"
          twClasses="text-lg"
        />
        <RouterLink
          routerLinkText="Collectibles"
          to="/category/collectibles"
          twClasses="text-lg"
        />
        <RouterLink
          routerLinkText="Trending"
          to="/category/trending"
          twClasses="text-lg"
        />
      </div>
    </div>
  )
}

export default Category
