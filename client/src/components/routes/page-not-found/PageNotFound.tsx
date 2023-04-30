// Components
import Overview from "../../ui/Overview"

// Assets
import PageNotFoundImage from "../../../../public/page-not-found-undraw.svg"

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Overview twClasses="space-y-20">
        <img src={PageNotFoundImage} alt="Page Not Found!" />
        <h1 className="text-2xl font-bold">
          404 Error! Looks like you accessed a dead end!
        </h1>
      </Overview>
    </div>
  )
}

export default PageNotFound
