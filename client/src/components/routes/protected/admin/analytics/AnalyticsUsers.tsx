import { useEffect, useState } from "react"
import Card from "../../../../ui/Card"

const AnalyticsUsers = () => {
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `http://localhost:${import.meta.env.BACKEND_SERVER_PORT}/api/user`
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
    <Card twClasses="w-full p-4 h-full shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Registered Users: {users.length}</p>
        </div>
      </div>
    </Card>
  )
}

export default AnalyticsUsers
