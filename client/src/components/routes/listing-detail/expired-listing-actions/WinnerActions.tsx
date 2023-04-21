import { useParams } from "react-router-dom"
import StyledButton from "../../../ui/StyledButton"
import { useState } from "react"
import Success from "../../../ui/Success"
import Error from "../../../ui/Error"

const WinnerActions = () => {
  const { listingId } = useParams()

  const [errorMessage, setErrorMessage] = useState("")
  const [scsMessage, setScsMessage] = useState("")

  const onConfirmDelivery = async () => {
    const response = await fetch(
      `http://localhost:${
        import.meta.env.VITE_BACKEND_SERVER_PORT
      }/api/listing/status/${listingId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "sold" }),
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

  const onDisputeClick = async () => {
    const response = await fetch(
      `http://localhost:${
        import.meta.env.VITE_BACKEND_SERVER_PORT
      }/api/listing/status/${listingId}`,
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
    <div className="w-full border-2 border-secondary p-4 rounded-lg">
      <h1 className="text-center font-semibold text-lg mb-3">
        You won this listing!
      </h1>
      <div className="space-y-5">
        <StyledButton
          buttonText="Contact Lister"
          onClick={() => {}}
          twClasses="text-2xl py-4 w-full hover:bg-black"
        />
        <StyledButton
          buttonText="Confirm Delivery"
          onClick={onConfirmDelivery}
          twClasses="text-2xl py-4 w-full hover:bg-tertiary"
          intent="secondary"
        />
        <StyledButton
          buttonText="Dispute"
          onClick={onDisputeClick}
          twClasses="text-2xl py-4 w-full bg-transparent text-tertiary underline"
        />
        {scsMessage && <Success successMessage={scsMessage} />}
        {errorMessage && <Error errorMessage={errorMessage} />}
      </div>
    </div>
  )
}

export default WinnerActions
