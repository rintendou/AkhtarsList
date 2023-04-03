import { Link } from "react-router-dom"

type Props = {
  children: React.ReactNode
  to: string
}
const ProfileRouterLink = ({ children, to }: Props) => {
  return (
    <Link to={to} className="p-4 flex">
      {children}
    </Link>
  )
}

export default ProfileRouterLink
