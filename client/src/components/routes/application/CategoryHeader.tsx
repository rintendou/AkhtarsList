import RouterLink from "../../ui/RouterLink"

const CategoryHeader = () => {
  return (
    <div className="bg-gray-200 flex justify-center gap-8 p-4">
      <RouterLink
        routerLinkText="Sneakers"
        to="/category/sneakers"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Antiques"
        to="/category/antiques"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Tech"
        to="/category/tech"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Accessories"
        to="/category/accessories"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Collectibles"
        to="/category/collectibles"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Trending"
        to="/category/trending"
        twClasses="text-xl"
      />
    </div>
  )
}

export default CategoryHeader
