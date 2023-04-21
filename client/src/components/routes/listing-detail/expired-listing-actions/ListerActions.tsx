import StyledButton from "../../../ui/StyledButton"

const ListerActions = () => {
  return (
    <div className="w-full border-2 border-secondary p-4 rounded-lg">
      <h1 className="text-center font-semibold text-lg">
        Somebody won the listing!
      </h1>
      <div className="space-y-5">
        <StyledButton
          buttonText="Contact Winner"
          onClick={() => {}}
          twClasses="text-2xl py-4 w-full hover:bg-black"
        />
      </div>
    </div>
  )
}

export default ListerActions
