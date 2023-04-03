import useAuth from "../../../lib/hooks/useAuth"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { auth } = useAuth()

  return (
    <footer className="p-8 flex flex-row justify-between items-center bg-secondary text-primary">
      <nav className="hidden md:flex flex-row gap-4">
        {auth._id ? (
          <>
            <RouterLink to="/app" routerLinkText="Browse" twClasses="p-2" />
            <RouterLink
              to="/profile"
              routerLinkText="Profile"
              twClasses="p-2"
            />
          </>
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
      <RouterLink
        twClasses="text-2xl font-bold"
        routerLinkText="AkhtarsList"
        to="/"
      />
    </footer>
  )
}

export default Footer
