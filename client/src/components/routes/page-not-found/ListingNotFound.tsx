// Components
import Overview from "../../ui/Overview"
import RouterLink from "../../ui/RouterLink"

// Assets
import ListingNotFoundImage from "../../../../public/page-not-found-undraw.svg"

const ListingNotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Overview twClasses="space-y-20">
        <img
          src={ListingNotFoundImage}
          alt="Page Not Found!"
          className="h-64 w-auto"
        />
        <div className="text-2xl font-bold">
          <h1>404 Error! Listing Not Found!</h1>
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

export default ListingNotFound
