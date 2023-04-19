import { createContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { settings } from "../../settings"

// Types
import ListingType from "../types/ListingType"

type initialContextType = {
  address: string
  balance: number
  fullName: string
  depositFunds: (amount: number) => void
  withdrawFunds: (amount: number) => void
  listings: ListingType[]
  biddings: ListingType[]
  wonListings: ListingType[]
  disputedListings: ListingType[]
  refetchUserDetails: () => void
}

const initialContext: initialContextType = {
  address: "",
  balance: 0,
  fullName: "",
  depositFunds: () => {},
  withdrawFunds: () => {},
  listings: [],
  biddings: [],
  wonListings: [],
  disputedListings: [],
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
  const [fullName, setFullName] = useState("")

  const [biddings, setBiddings] = useState<ListingType[]>([])
  const [listings, setListings] = useState<ListingType[]>([])
  const [wonListings, setWonListings] = useState<ListingType[]>([])
  const [disputedListings, setDisputedListings] = useState<ListingType[]>([])

  // Fetch user details on component mount and when _id changes on auth
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/${_id}`
      )
      const data = await response.json()

      if (!data.ok) {
        return
      }

      setAddress(data.data.address)
      setBalance(data.data.balance)
      setFullName(data.data.fullName)
      setBiddings(data.data.biddedListings.reverse())
      setListings(data.data.listedListings.reverse())
      setWonListings(data.data.wonListings.reverse())
      setDisputedListings(data.data.disputedListings.reverse())
    }

    fetchUserDetails()
  }, [_id])

  const refetchUserDetails = () => {
    const refetchUser = async () => {
      if (!_id) {
        return
      }

      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/user/${_id}`
      )
      const data = await response.json()

      if (!data.ok) {
        return
      }

      setAddress(data.data.address)
      setBalance(data.data.balance)
      setFullName(data.data.fullName)
      setBiddings(data.data.biddedListings.reverse())
      setListings(data.data.listedListings.reverse())
      setWonListings(data.data.wonListings.reverse())
      setDisputedListings(data.data.disputedListings.reverse())
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
    fullName,
    depositFunds,
    withdrawFunds,
    biddings,
    listings,
    wonListings,
    disputedListings,
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
