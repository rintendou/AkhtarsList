import RouterLink from "../../ui/RouterLink"

const Header = () => {
  return (
    <header className="p-4 flex flex-row justify-between items-center bg-secondary text-primary sticky top-0">
      <h1 className="text-2xl font-bold">AkhtarsList</h1>
      <nav className="hidden md:flex flex-row gap-4">
        <RouterLink to="/" routerLinkText="Home" />
        <RouterLink to="/login" routerLinkText="Login" />
        <RouterLink to="/register" routerLinkText="Register" />
        <RouterLink to="/dev" routerLinkText="Dev" />
      </nav>
    </header>
  )
}

export default Header
