type UserType = {
  username: string
}

type BiddersProps = {
  bidders: UserType[]
}

const Bidders = ({ bidders }: BiddersProps) => {
  return (
    <ul>
      {bidders &&
        bidders.map((bidder: UserType, index: number) => (
          <li key={index}>{bidder.username}</li>
        ))}
    </ul>
  )
}

export default Bidders
