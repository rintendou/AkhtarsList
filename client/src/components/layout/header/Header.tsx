import RouterLink from "../../ui/RouterLink"
import useAuth from "../../../lib/hooks/useAuth"
import SearchBar from "./SearchBar"

const Header = () => {
  const { auth } = useAuth()

  return (
    <header className="p-8 flex flex-row justify-between items-center bg-secondary text-primary sticky top-0 gap-8">
      <h1 className="text-2xl font-bold">AkhtarsList</h1>
      {auth._id && <SearchBar />}
      <nav className="hidden md:flex flex-row gap-4">
        {auth._id ? (
          <>
            <RouterLink
              to="/app"
              routerLinkText="App"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/profile"
              routerLinkText="Profile"
              twClasses="border p-2 border-main w-20 text-center"
            />
          </>
        ) : (
          <>
            <RouterLink
              to="/"
              routerLinkText="Home"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/login"
              routerLinkText="Login"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/register"
              routerLinkText="Register"
              twClasses="border p-2 border-main w-20 text-center"
            />
            <RouterLink
              to="/dev"
              routerLinkText="Dev"
              twClasses="border p-2 border-main w-20 text-center"
            />
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
