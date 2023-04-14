import { useNavigate } from "react-router-dom"
import useListingDetailContextQuery from "../../../lib/hooks/useListingDetailContext"

const EditListing = () => {
  const { data } = useListingDetailContextQuery()
  const { data: listing } = data

  const navigate = useNavigate()

  const onListingEditClick = () => {
    navigate("/edit", {
      state: { listing: listing },
    })
  }

  return (
    <div onClick={onListingEditClick}>
      <h1 className="text-xs font-light text-gray-500 tracking-widest underline text-center cursor-pointer hover:text-black duration-200 ease-in-out hover:font-semibold uppercase">
        Edit Listing
      </h1>
    </div>
  )
}

export default EditListing
