import UserType from "./UserType"

type ListingType = {
  _id: string
  image: string
  bidders: UserType[]
  lister: UserType
  title: string
  desc: string
  startPrice: number
  finalPrice: number
  expireAt: Date
  views: number
  category: string
  weight: number
  dimensions: number[]
}

export default ListingType
