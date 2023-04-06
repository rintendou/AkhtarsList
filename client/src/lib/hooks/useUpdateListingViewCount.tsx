import { settings } from "../../settings"

const useUpdateListingViewCount = () => {
  const updateListingViewCount = (listingId: string) => {
    const updateLVC = async () => {
      const response = await fetch(
        `http://localhost:${settings.BACKEND_SERVER_PORT}/api/listing/fetch/${listingId}`
      )
      const json = await response.json()

      if (!json.ok) {
        return
      }
    }
    updateLVC()
  }

  return { updateListingViewCount }
}

export default useUpdateListingViewCount
