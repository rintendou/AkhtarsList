// Hooks
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"
import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"

// Components
import Success from "../../ui/Success"
import Error from "../../ui/Error"

const ReportListing = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { data } = useListingDetailContextQuery()
  const { data: listing } = data
  const { _id: listingId } = listing

  const { auth } = useAuthContext()

  const navigate = useNavigate()

  const onSubmitReport = async () => {
    if (!auth._id) {
      navigate("/login", {
        state: { errorMessage: "Must be logged in to do that!" },
      })
    }

    const response = await fetch(
      `https://rvyt24-${
        import.meta.env.VITE_BACKEND_SERVER_PORT
      }.csb.app/api/listing/report/${listingId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: auth._id,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )

    const json = await response.json()

    if (!json.ok) {
      setErrorMessage(json.message)
      setSuccessMessage("")
      return
    }

    setErrorMessage("")
    setSuccessMessage(json.message)
  }

  return (
    <>
      <div
        className="text-xs font-light text-gray-500 tracking-widest underline text-center cursor-pointer hover:text-black duration-200 ease-in-out hover:font-semibold uppercase space-y-10 dark:hover:text-gray-700 dark:text-primary"
        onClick={onSubmitReport}
      >
        <h1>Report this listing</h1>
      </div>
      {successMessage && <Success successMessage={successMessage} />}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </>
  )
}

export default ReportListing
