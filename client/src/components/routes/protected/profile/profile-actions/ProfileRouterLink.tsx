import { Link } from "react-router-dom"

type Props = {
  children: React.ReactNode
  to: string
}
const ProfileRouterLink = ({ children, to }: Props) => {
  return (
    <Link
      to={to}
      className="px-10 py-5 flex items-center hover:bg-blue-200 duration-100 ease-in-out hover:shadow-sm"
    >
      {children}
    </Link>
  )
}

export default ProfileRouterLink
