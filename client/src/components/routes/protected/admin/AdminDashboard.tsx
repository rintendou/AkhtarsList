import useProfileContext from "../../../../lib/hooks/context-hooks/useProfileContext"
import ScrollToTop from "../../../../lib/util/components/ScrollToTop"
import Card from "../../../ui/Card"

const AdminDashboard = () => {
  const { username } = useProfileContext()

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ScrollToTop />
      <Card twClasses="p-10 md:p-20 m-0 md:m-10 shadow-lg space-y-5 w-[35rem] text-center text-4xl font-semibold group cursor-pointer bg-secondary dark:bg-black dark:border-4 dark:border-tertiary">
        <div className="text-primary group-hover:text-tertiary duration-200 ease-in-out">
          <p>Welcome back,</p>
          <p>{username}!</p>
        </div>
      </Card>
    </div>
  )
}

export default AdminDashboard
