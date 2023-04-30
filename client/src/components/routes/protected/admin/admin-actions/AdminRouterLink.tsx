// Hooks
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
      className={`px-10 py-5 flex items-center hover:bg-blue-200 duration-100 ease-in-out hover:shadow-sm dark:hover:bg-tertiary ${
        location.pathname === to && "bg-blue-200 dark:bg-tertiary"
      } ${twClasses}`}
    >
      {children}
    </Link>
  )
}

export default AdminRouterLink
