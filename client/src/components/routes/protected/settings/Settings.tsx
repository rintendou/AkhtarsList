import Card from "../../../ui/Card"
import { Link } from "react-router-dom"

const Settings = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card twClasses="p-10 md:p-20 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <h1 className="text-4xl font-bold text-center">Edit Profile</h1>
        <div className="flex flex-col gap-5">
          <EditUserDetailsLink />
          <EditSecurityQuestionsLink />
          <EditPasswordLink />
        </div>
      </Card>
    </div>
  )
}

const EditUserDetailsLink = () => {
  return (
    <Link
      to=""
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg`}
      type="submit"
    >
      Change User Details
    </Link>
  )
}

const EditSecurityQuestionsLink = () => {
  return (
    <Link
      to=""
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg`}
      type="submit"
    >
      Change Password
    </Link>
  )
}

const EditPasswordLink = () => {
  return (
    <Link
      to=""
      className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-lg`}
      type="submit"
    >
      Change Security Questions
    </Link>
  )
}

export default Settings
