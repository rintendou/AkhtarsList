// Hooks
import { Link, useLocation } from "react-router-dom"

// Types
type Props = {
  children: React.ReactNode
  to: string
}
const ProfileRouterLink = ({ children, to }: Props) => {
  const location = useLocation()

  return (
    <Link
      to={to}
      className={`px-10 py-5 flex items-center hover:bg-blue-200 duration-100 ease-in-out hover:shadow-sm dark:hover:bg-tertiary ${
        location.pathname === to && "bg-blue-200 dark:bg-tertiary"
      } `}
    >
      {children}
    </Link>
  )
}

export default ProfileRouterLink
