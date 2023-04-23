import useAuth from "../../../lib/hooks/context-hooks/useAuthContext"
import Logo from "../../ui/Logo"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { auth } = useAuth()

  return (
    <footer className="p-8 flex flex-row justify-between items-center bg-secondary text-primary border-t-2 border-t-tertiary dark:bg-black">
      <nav className="hidden md:flex flex-row gap-4">
        {auth._id ? (
          <>
            <RouterLink
              to="/"
              routerLinkText="Browse"
              twClasses="p-2 text-lg"
            />
            <RouterLink
              to="/sell"
              routerLinkText="Sell"
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
          </>
        )}
      </nav>
      <Logo />
    </footer>
  )
}

export default Footer
