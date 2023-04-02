import RouterLink from "../../ui/RouterLink"
import useAuth from "../../../lib/hooks/useAuth"

const Header = () => {
  const { auth } = useAuth()

  return (
    <header className="p-4 flex flex-row justify-between items-center bg-secondary text-primary sticky top-0">
      <h1 className="text-2xl font-bold">AkhtarsList</h1>
      <nav className="hidden md:flex flex-row gap-4">
        {auth._id ? (
          <>
            <RouterLink to="/app" routerLinkText="Application" />
            <RouterLink to="/profile" routerLinkText="Profile" />
          </>
        ) : (
          <>
            <RouterLink to="/" routerLinkText="Home" />
            <RouterLink to="/login" routerLinkText="Login" />
            <RouterLink to="/register" routerLinkText="Register" />
            <RouterLink to="/dev" routerLinkText="Dev" />
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
