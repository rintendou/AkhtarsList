type ListingType = {
  _id: string
  image: string
  bidders: string[]
  bestBidder: string
  lister: string
  listerUsername: string
  title: string
  desc: string
  startPrice: number
  finalPrice: number
  expireAt: Date
  views: number
  category: string
  weight: number
  dimensions: number[]
  height: number
  length: number
  width: number
  [key: string]: any
}

export default ListingType
