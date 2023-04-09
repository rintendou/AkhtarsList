import Overview from "../../ui/Overview"

import UnauthorizedAccessImage from "unauthorized-access-undraw.svg"

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Overview twClasses="space-y-20">
        <img src={UnauthorizedAccessImage} alt="Unauthorized Request!" />
        <h1 className="text-2xl font-bold">
          Nice Try! You are not supposed to access this.
        </h1>
      </Overview>
    </div>
  )
}

export default Unauthorized
