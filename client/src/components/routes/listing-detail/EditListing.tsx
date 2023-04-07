import { useNavigate } from "react-router-dom"

import ListingType from "../../../lib/types/ListingType"

type Props = {
  listing: ListingType
}

const EditListing = ({ listing }: Props) => {
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
