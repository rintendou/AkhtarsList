import useAuth from "../../../lib/hooks/useAuth"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { auth } = useAuth()

  return (
    <footer className="p-8 flex flex-row justify-between items-center bg-secondary text-primary">
      <nav className="hidden md:flex flex-row gap-4">
        {auth._id ? (
          <>
            <RouterLink
              to="/"
              routerLinkText="Browse"
              twClasses="p-2 text-lg"
            />
            <RouterLink
              to="/profile"
              routerLinkText="Profile"
              twClasses="p-2 text-lg"
            />
          </>
        ) : (
          <>
            <RouterLink
              to="/login"
              routerLinkText="Login"
              twClasses="p-2 w-24 text-center text-lg"
            />
            <RouterLink
              to="/register"
              routerLinkText="Register"
              twClasses="p-2 w-24 text-center text-lg"
            />
            <RouterLink
              to="/dev"
              routerLinkText="Dev"
              twClasses="p-2 w-24 text-center text-lg"
            />
          </>
        )}
      </nav>
      <RouterLink
        twClasses="text-2xl font-bold"
        routerLinkText="AkhtarsList"
        to="/"
      />
    </footer>
  )
}

export default Footer
