import { createContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"

type initialContextType = {
  address: string
  balance: number
  depositFunds: (amount: number) => void
  withdrawFunds: (amount: number) => void
  //   listings: []
  //   biddings: []
  //   wonListings: []
  //   disputedListings: []
}

const initialContext = {
  address: "",
  balance: 0,
  depositFunds: () => {},
  withdrawFunds: () => {},
}

const ProfileContext = createContext<initialContextType>(initialContext)

const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { auth } = useAuth()
  const { _id } = auth

  const [balance, setBalance] = useState(initialContext.balance)
  const [address, setAddress] = useState("")

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`http://localhost:5178/api/user/${_id}`)
      const data = await response.json()

      setAddress(data.data.address)
      setBalance(data.data.balance)
    }

    fetchUserDetails()
  }, [_id])

  // Deposit funds
  const depositFunds = (amount: number) => {
    console.log(amount)
    const deposit = async () => {
      const response = await fetch("http://localhost:5178/api/user/deposit", {
        method: "POST",
        body: JSON.stringify({
          userId: _id,
          depositAmount: amount,
        }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()

      if (!data.ok) {
        return
      }

      setBalance(data.data)
    }
    deposit()
  }

  // Withdraw funds
  const withdrawFunds = (amount: number) => {
    const withdraw = async () => {
      const response = await fetch("http://localhost:5178/api/user/withdraw", {
        method: "POST",
        body: JSON.stringify({
          userId: _id,
          withdrawAmount: amount,
        }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()

      if (!data.ok) {
        return
      }

      setBalance(data.data)
    }
    withdraw()
  }

  const contextValue = {
    address,
    balance,
    depositFunds,
    withdrawFunds,
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
export { ProfileContext }
