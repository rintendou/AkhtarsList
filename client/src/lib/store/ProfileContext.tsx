import { createContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { settings } from "../../settings"

type UserType = {
  username: string
}

type ListingType = {
  _id: string
  image: string
  bidders: UserType[]
  lister: UserType
  title: string
  desc: string
  startPrice: number
  finalPrice: number
  expireAt: number
  views: number
  category: string
  weight: number
  dimensions: [height: number, width: number, length: number]
}

type initialContextType = {
  address: string
  balance: number
  depositFunds: (amount: number) => void
  withdrawFunds: (amount: number) => void
  listings: ListingType[]
  biddings: ListingType[]
  //   wonListings: []
  //   disputedListings: []
  refetchUserDetails: () => void
}

const initialContext: initialContextType = {
  address: "",
  balance: 0,
  depositFunds: () => {},
  withdrawFunds: () => {},
  listings: [],
  biddings: [],
  refetchUserDetails: () => {},
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

  const [biddings, setBiddings] = useState<ListingType[]>([])
  const [listings, setListings] = useState<ListingType[]>([])

  // Fetch user details on component mount and when _id changes on auth
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/${_id}`
      )
      const data = await response.json()

      setAddress(data.data.address)
      setBalance(data.data.balance)
      setBiddings(data.data.biddedListings.reverse())
      setListings(data.data.listedListings.reverse())
    }

    fetchUserDetails()
  }, [_id])

  const refetchUserDetails = () => {
    const refetchUser = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/${_id}`
      )
      const data = await response.json()

      setAddress(data.data.address)
      setBalance(data.data.balance)
      setBiddings(data.data.biddedListings.reverse())
      setListings(data.data.listedListings.reverse())
    }
    refetchUser()
  }

  // Deposit funds
  const depositFunds = (amount: number) => {
    const deposit = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/deposit`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: _id,
            depositAmount: amount,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
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
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/withdraw`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: _id,
            withdrawAmount: amount,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
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
    biddings,
    listings,
    refetchUserDetails,
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
export { ProfileContext }
