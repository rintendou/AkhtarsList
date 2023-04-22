import { Outlet } from "react-router-dom"
import AdminActions from "../admin/admin-actions/AdminActions"

const AdminLayout = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex min-h-screen bg-purple-100 w-[20.2em] max-w-[20.2em] min-w-[20.2em] flex-col mr-5">
        <AdminActions />
      </div>
      <div className="min-h-screen w-full flex">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
