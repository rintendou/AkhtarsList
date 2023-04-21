import StyledButton from "../../../ui/StyledButton"

const WinnerActions = () => {
  return (
    <div className="w-full">
      <h1 className="text-center font-semibold text-lg">
        You won this listing!
      </h1>
      <div className="space-y-5">
        <StyledButton
          buttonText="Contact Lister"
          onClick={() => {}}
          twClasses="text-2xl py-4 w-full hover:bg-black"
        />
        <StyledButton
          buttonText="Dispute"
          onClick={() => {}}
          twClasses="text-2xl py-4 w-full hover:bg-gray-200"
          intent="secondary"
        />
        <StyledButton
          buttonText="Confirm Delivery"
          onClick={() => {}}
          twClasses="text-2xl py-4 w-full bg-tertiary"
        />
      </div>
    </div>
  )
}

export default WinnerActions
