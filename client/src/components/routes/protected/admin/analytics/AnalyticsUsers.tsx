// Hooks
import { useEffect, useState } from "react"
import useAuthContext from "../../../../../lib/hooks/context-hooks/useAuthContext"

// Components
import Card from "../../../../ui/Card"

const AnalyticsUsers = () => {
  const [users, setUsers] = useState<string[]>([])
  const { auth } = useAuthContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const DOMAIN = import.meta.env.VITE_DOMAIN

      const response = await fetch(`${DOMAIN}/api/user`, {
        headers: { Authorization: auth.token },
      })
      const json = await response.json()
      if (!json.ok) {
        return
      }

      setUsers(json.data)
    }
    fetchUsers()
  }, [])

  return (
    <Card twClasses="w-full h-full shadow-lg border-secondary dark:bg-black border-2 dark:border-tertiary">
      <h1 className="text-2xl font-semibold p-4 bg-secondary dark:bg-black dark:border-b-2 dark:border-tertiary text-primary">
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
