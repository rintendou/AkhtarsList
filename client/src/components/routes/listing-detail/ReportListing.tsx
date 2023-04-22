import { useState } from "react"
import Success from "../../ui/Success"
import Error from "../../ui/Error"

const ReportListing = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const onSubmitReport = async () => {
    const response = await fetch(
      `http://localhost:${import.meta.env.VITE_BACKEND_SERVER_PORT}/api/`
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
    <div
      className="text-xs font-light text-gray-500 tracking-widest underline text-center cursor-pointer hover:text-black duration-200 ease-in-out hover:font-semibold uppercase"
      onClick={onSubmitReport}
    >
      <h1>Report this listing</h1>
      {successMessage && <Success successMessage={successMessage} />}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  )
}

export default ReportListing
