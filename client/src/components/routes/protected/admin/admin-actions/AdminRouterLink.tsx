import { Link, useLocation } from "react-router-dom"

type Props = {
  children: React.ReactNode
  to: string
  twClasses?: string
}
const AdminRouterLink = ({ children, to, twClasses }: Props) => {
  const location = useLocation()

  return (
    <Link
      to={to}
      className={`px-10 py-5 flex items-center text-secondary hover:bg-tertiary duration-100 ease-in-out hover:shadow-sm ${
        location.pathname === to && "bg-tertiary text-black"
      } ${twClasses}`}
    >
      {children}
    </Link>
  )
}

export default AdminRouterLink
