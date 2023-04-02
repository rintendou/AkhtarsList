import RouterLink from "../../ui/RouterLink"

const SideNavLinks = () => {
  return (
    <div className="p-5 flex flex-col gap-2 uppercase w-min">
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
  )
}

export default SideNavLinks
