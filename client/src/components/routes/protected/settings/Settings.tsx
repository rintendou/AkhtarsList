import Card from "../../../ui/Card"
import ChangePassword from "./ChangePassword"
import ChangeSecurityQuestions from "./ChangeSecurityQuestions"
import EditUserDetails from "./EditUserDetails"

const Settings = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card twClasses="p-10 md:p-20 m-0 md:m-10 shadow-lg space-y-5 w-[35rem]">
        <h1 className="text-4xl font-bold text-center mb-10">Settings</h1>
        <div className="flex flex-col gap-5">
          <EditUserDetails />
          <ChangePassword />
          <ChangeSecurityQuestions />
        </div>
      </Card>
    </div>
  )
}

export default Settings
