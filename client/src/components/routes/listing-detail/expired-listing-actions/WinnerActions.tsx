import { useParams } from "react-router-dom"
import StyledButton from "../../../ui/StyledButton"
import { useState } from "react"
import Success from "../../../ui/Success"
import Error from "../../../ui/Error"

const WinnerActions = () => {
  const { listingId } = useParams()

  const [errorMessage, setErrorMessage] = useState("")
  const [scsMessage, setScsMessage] = useState("")

  const onDisputeClick = async () => {
    const response = await fetch(
      `http://localhost:${
        import.meta.env.VITE_BACKEND_SERVER_PORT
      }/api/listing/update/${listingId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "disputed" }),
        headers: { "Content-Type": "application/json" },
      }
    )
    const json = await response.json()

    if (!json.ok) {
      setScsMessage("")
      setErrorMessage(json.message)
      return
    }

    setErrorMessage("")
    setScsMessage(json.message)
  }

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
          onClick={onDisputeClick}
          twClasses="text-2xl py-4 w-full hover:bg-gray-200"
          intent="secondary"
        />
        <StyledButton
          buttonText="Confirm Delivery"
          onClick={() => {}}
          twClasses="text-2xl py-4 w-full bg-tertiary"
        />
        {scsMessage && <Success successMessage={scsMessage} />}
        {errorMessage && <Error errorMessage={errorMessage} />}
      </div>
    </div>
  )
}

export default WinnerActions
