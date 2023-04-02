import useAuth from "../../../lib/hooks/useAuth"
import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  const { auth } = useAuth()

  return (
    <footer className="px-4 py-2 flex flex-row justify-between items-center bg-secondary text-primary">
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
      <h1 className="text-2xl font-bold">Synapse</h1>
    </footer>
  )
}

export default Footer
