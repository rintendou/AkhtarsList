import { useEffect } from "react"

const ManageListings = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])
  return <div>ManageListings</div>
}

export default ManageListings
