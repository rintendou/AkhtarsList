import { Link, useLocation } from "react-router-dom"

type Props = {
  children: React.ReactNode
  to: string
}
const AdminRouterLink = ({ children, to }: Props) => {
  const location = useLocation()

  return (
    <Link
      to={to}
      className={`px-10 py-5 flex items-center bg-secondary text-primary hover:bg-tertiary duration-100 ease-in-out hover:shadow-sm ${
        location.pathname === to && "bg-tertiary"
      }`}
    >
      {children}
    </Link>
  )
}

export default AdminRouterLink