import RouterLink from "../../../ui/RouterLink"

const CategoryHeader = () => {
  return (
    <div className="bg-gray-200 flex justify-center gap-8 p-4">
      <RouterLink
        routerLinkText="Sneakers"
        to="/categories/sneakers"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Antiques"
        to="/categories/antiques"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Tech"
        to="/categories/tech"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Accessories"
        to="/categories/accessories"
        twClasses="text-xl"
      />
      <RouterLink
        routerLinkText="Collectibles"
        to="/categories/collectibles"
        twClasses="text-xl"
      />
    </div>
  )
}

export default CategoryHeader
