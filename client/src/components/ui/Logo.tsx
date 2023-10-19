// Components
import { Link, useLocation } from "react-router-dom"

const Logo = () => {
  return (
    <Link
      to="/"
      className={`font-bold text-2xl text-tertiary hover:text-tertiary ease-in-out duration-200 `}
    >
      List
      <span className="bg-orange-500 rounded-md py-0.5 px-1 m-0.5">Hub</span>
    </Link>
  )
}

export default Logo
