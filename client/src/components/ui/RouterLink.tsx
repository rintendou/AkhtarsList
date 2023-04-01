import { Link, useLocation } from "react-router-dom"

type Props = {
  to: string
  routerLinkText: string
  twClasses?: string
}

const RouterLink = ({ to, routerLinkText, twClasses }: Props) => {
  const { pathname } = useLocation()

  const activatedRouterLinkClasses = pathname === to && "text-tertiary"

  return (
    <Link
      to={to}
      className={`font-bold text-main hover:text-tertiary ease-in-out duration-200 ${activatedRouterLinkClasses} ${twClasses}`}
    >
      {routerLinkText}
    </Link>
  )
}

export default RouterLink
