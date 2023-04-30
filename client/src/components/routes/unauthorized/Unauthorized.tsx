// Components
import Overview from "../../ui/Overview"
import UnauthorizedAccessImage from "../../../../public/unauthorized-access-undraw.svg"
import RouterLink from "../../ui/RouterLink"

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex justify-center items-cente p-20 py-40">
      <Overview twClasses="space-y-20 flex flex-col">
        <img
          src={UnauthorizedAccessImage}
          alt="Unauthorized Request!"
          className="h-64 w-auto"
        />
        <div className="text-xl font-semibold">
          <h1>Nice Try! You are not supposed to access this route</h1>
          <div className="text-sm space-x-1.5 text-gray-500">
            <span>Go back</span>
            <RouterLink
              to="/"
              routerLinkText="here"
              twClasses="text-tertiary"
            />
          </div>
        </div>
      </Overview>
    </div>
  )
}

export default Unauthorized
