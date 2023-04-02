import { createContext, useState } from "react"

type initialContextType = {
  balance: number
  depositFunds: (amount: number) => void
  withdrawFunds: (amount: number) => void
  //   listings: []
  //   biddings: []
  //   wonListings: []
  //   disputedListings: []
}

const initialContext = {
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
  const [balance, setBalance] = useState(initialContext.balance)

  const depositFunds = (amount: number) => {
    const deposit = async () => {
      const response = await fetch("http://localhost:5178/api/user/deposit", {
        method: "POST",
        body: JSON.stringify({
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

  const withdrawFunds = (amount: number) => {
    const withdraw = async () => {
      const response = await fetch("http://localhost:5178/api/user/deposit", {
        method: "POST",
        body: JSON.stringify({
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
