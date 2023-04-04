import RouterLink from "../../ui/RouterLink"
import useAuth from "../../../lib/hooks/useAuth"
import SearchBar from "./SearchBar"

const Header = () => {
  const { auth } = useAuth()

  return (
    <header className="p-8 flex flex-row justify-between items-center bg-secondary text-primary sticky top-0 gap-8 z-10">
      <RouterLink
        twClasses="text-2xl font-bold"
        routerLinkText="AkhtarsList"
        to="/"
      />
      {auth._id && <SearchBar />}
      <nav className="hidden md:flex flex-row gap-4">
        {auth._id ? (
          <LoggedInNavbar />
        ) : (
          <>
            <RouterLink
              to="/"
              routerLinkText="Home"
              twClasses="border p-2 border-main rounded-md w-20 text-center"
            />
            <RouterLink
              to="/login"
              routerLinkText="Login"
              twClasses="border p-2 border-main rounded-md w-20 text-center"
            />
            <RouterLink
              to="/register"
              routerLinkText="Register"
              twClasses="border p-2 border-main rounded-md w-20 text-center"
            />
            <RouterLink
              to="/dev"
              routerLinkText="Dev"
              twClasses="border p-2 border-main rounded-md w-20 text-center"
            />
          </>
        )}
      </nav>
    </header>
  )
}

export default Header

const LoggedInNavbar = () => {
  return (
    <>
      <RouterLink to="/app" routerLinkText="Browse" twClasses="p-2" />

      <RouterLink to="/sell" routerLinkText="Sell" twClasses="p-2" />
      <RouterLink to="/profile" routerLinkText="Profile" twClasses="p-2" />
    </>
  )
}
