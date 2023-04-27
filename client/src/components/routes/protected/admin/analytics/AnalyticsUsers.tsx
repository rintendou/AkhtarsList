import { useEffect, useState } from "react"
import Card from "../../../../ui/Card"
import useAuthContext from "../../../../../lib/hooks/context-hooks/useAuthContext"

const AnalyticsUsers = () => {
  const [users, setUsers] = useState<string[]>([])
  const { auth } = useAuthContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `http://localhost:${import.meta.env.VITE_BACKEND_SERVER_PORT}/api/user`,
        {
          headers: { Authorization: auth.token },
        }
      )
      const json = await response.json()
      if (!json.ok) {
        return
      }

      setUsers(json.data)
    }
    fetchUsers()
  }, [])

  return (
    <Card twClasses="w-full h-full shadow-lg border-4 border-secondary dark:bg-black dark:border-4 dark:border-tertiary">
      <h1 className="text-2xl font-semibold p-4 bg-secondary text-primary">
        Users
      </h1>
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <p>Registered Users: {users.length}</p>
        </div>
      </div>
    </Card>
  )
}

export default AnalyticsUsers
