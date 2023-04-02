import useAuth from "../../../lib/hooks/useAuth"

import Card from "../../ui/Card"
import { useEffect, useState } from "react"
import ProfileActions from "./ProfileActions"

const Profile = () => {
  const { auth, logout } = useAuth()

  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { _id } = auth

      const response = await fetch(`http://localhost:5178/api/user/${_id}`)
      const data = await response.json()

      setAddress(data.data.address)
      setBalance(data.data.balance)
    }

    fetchUserDetails()
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card twClasses="h-96 p-10 w-full flex flex-col md:flex-row justify-around items-center">
        <div className="space-y-10">
          <h1 className="text-4xl font-bold">{auth.username}</h1>
          <div>
            <h2 className="text-lg">Address: {address}</h2>
            <h2 className="text-lg">Balance: ${balance}</h2>
          </div>
        </div>
        <ProfileActions logout={logout} />
      </Card>
    </div>
  )
}

export default Profile
