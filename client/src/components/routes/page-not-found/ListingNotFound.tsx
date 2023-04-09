import Overview from "../../ui/Overview"

import ListingNotFoundImage from "../../../../public/page-not-found-undraw.svg"

const ListingNotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Overview twClasses="space-y-20">
        <img src={ListingNotFoundImage} alt="Page Not Found!" />
        <h1 className="text-2xl font-bold">404 Error! Listing Not Found!</h1>
      </Overview>
    </div>
  )
}

export default ListingNotFound
