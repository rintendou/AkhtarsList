import { useState } from "react"
import Success from "../../ui/Success"
import Error from "../../ui/Error"
import useListingDetailContextQuery from "../../../lib/hooks/context-hooks/useListingDetailContext"
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext"

const ReportListing = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { data } = useListingDetailContextQuery()
  const { data: listing } = data
  const { _id: listingId } = listing

  const { auth } = useAuthContext()

  const onSubmitReport = async () => {
    const response = await fetch(
      `http://localhost:${
        import.meta.env.VITE_BACKEND_SERVER_PORT
      }/api/listing/report/${listingId}`,
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
