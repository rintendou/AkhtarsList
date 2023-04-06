type UserType = {
  username: string
}

type BiddersProps = {
  bidders: UserType[]
}

const Bidders = ({ bidders }: BiddersProps) => {
  return (
    <ul className="space-y-5">
      {bidders.length !== 0 ? (
        bidders.map((bidder: UserType, index: number) => (
          <li key={index}>{bidder.username}</li>
        ))
      ) : (
        <div className="text-center">
          <h1 className="font-semibold text-lg">No bidders yet!</h1>
          <p className="text-sm">Be the first one to bid!</p>
        </div>
      )}
    </ul>
  )
}

export default Bidders
