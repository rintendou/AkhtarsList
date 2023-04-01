import RouterLink from "../../ui/RouterLink"

const Footer = () => {
  return (
    <footer className="px-4 py-2 flex flex-row justify-between items-center bg-secondary text-primary">
      <nav className="hidden md:flex flex-row gap-4">
        <RouterLink to="/" routerLinkText="Home" />
        <RouterLink to="/app" routerLinkText="App" />
        <RouterLink to="/test" routerLinkText="Test" />
      </nav>
      <h1 className="text-2xl font-bold">Synapse</h1>
    </footer>
  )
}

export default Footer
