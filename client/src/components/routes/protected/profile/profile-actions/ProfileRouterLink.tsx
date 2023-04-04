import { Link, useLocation } from "react-router-dom"

type Props = {
  children: React.ReactNode
  to: string
}
const ProfileRouterLink = ({ children, to }: Props) => {
  const location = useLocation()

  return (
    <Link
      to={to}
      className={`px-10 py-5 flex items-center hover:bg-blue-200 duration-100 ease-in-out hover:shadow-sm ${
        location.pathname === to && "bg-blue-200"
      }`}
    >
      {children}
    </Link>
  )
}

export default ProfileRouterLink
