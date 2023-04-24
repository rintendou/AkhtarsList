import { createContext, useEffect, useState } from "react"
import useAuthContext from "../hooks/context-hooks/useAuthContext"

// Types
import ListingType from "../types/ListingType"

type initialContextType = {
  username: string
  address: string
  balance: number
  fullName: string
  depositFunds: (amount: number) => void
  withdrawFunds: (amount: number) => void
  listings: ListingType[]
  biddings: ListingType[]
  wonListings: ListingType[]
  disputedListings: ListingType[]
  reportedListings: ListingType[]
  refetchUserDetails: () => void
}

const initialContext: initialContextType = {
  username: "",
  address: "",
  balance: 0,
  fullName: "",
  depositFunds: () => {},
  withdrawFunds: () => {},
  listings: [],
  biddings: [],
  wonListings: [],
  disputedListings: [],
  reportedListings: [],
  refetchUserDetails: () => {},
}

const ProfileContext = createContext<initialContextType>(initialContext)

const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { auth } = useAuthContext()
  const { _id } = auth

  const [username, setUsername] = useState("")
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState("")
  const [fullName, setFullName] = useState("")

  const [biddings, setBiddings] = useState<ListingType[]>([])
  const [listings, setListings] = useState<ListingType[]>([])
  const [wonListings, setWonListings] = useState<ListingType[]>([])
  const [disputedListings, setDisputedListings] = useState<ListingType[]>([])
  const [reportedListings, setReportedListings] = useState<ListingType[]>([])

  // Fetch user details on component mount and when _id changes on auth
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!_id) {
        return
      }

      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/user/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      )

      const data = await response.json()

      if (!data.ok) {
        return
      }

      setUsername(data.data.username)
      setAddress(data.data.address)
      setBalance(data.data.balance)
      setFullName(data.data.fullName)
      setBiddings(data.data.biddedListings.reverse())
      setListings(data.data.listedListings.reverse())
      setWonListings(data.data.wonListings.reverse())
      setDisputedListings(data.data.disputedListings.reverse())
      setReportedListings(data.data.reportedListings)
    }

    fetchUserDetails()
  }, [auth.token, auth._id])

  const refetchUserDetails = () => {
    const refetchUser = async () => {
      if (!_id) {
        return
      }

      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/user/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
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
      setReportedListings(data.data.reportedListings)
    }
    refetchUser()
  }

  // Deposit funds
  const depositFunds = (amount: number) => {
    const deposit = async () => {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/user/deposit`,
        {
          method: "POST",
          body: JSON.stringify({
            depositAmount: amount,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
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
        `http://localhost:${
          import.meta.env.VITE_BACKEND_SERVER_PORT
        }/api/user/withdraw`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: _id,
            withdrawAmount: amount,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
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
    username,
    address,
    balance,
    fullName,
    depositFunds,
    withdrawFunds,
    biddings,
    listings,
    wonListings,
    disputedListings,
    reportedListings,
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
