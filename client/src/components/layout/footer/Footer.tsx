import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  return (
    <footer className="px-4 py-2 flex flex-row justify-between items-center bg-secondary text-primary">
      <nav className="hidden md:flex flex-row gap-4">
        <RouterLink to="/home" routerLinkText="Home" />
        <RouterLink to="/login" routerLinkText="Login" />
        <RouterLink to="/register" routerLinkText="Register" />
        <RouterLink to="/dev" routerLinkText="Dev" />
      </nav>
      <h1 className="text-2xl font-bold">Synapse</h1>
    </footer>
  )
}

export default Footer
