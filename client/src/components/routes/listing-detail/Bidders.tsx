const Bidders = ({ bidders }: any) => {
  return (
    <ul>
      {!bidders &&
        bidders.map((bidder: any, index: number) => (
          <li key={index}>{bidder.name}</li>
        ))}
    </ul>
  )
}

export default Bidders
