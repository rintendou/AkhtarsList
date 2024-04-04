const fetchListingDetail = async (listingId: string) => {
  const DOMAIN = import.meta.env.VITE_DOMAIN

  const response = await fetch(`${DOMAIN}/api/listing/fetch/${listingId}`)
  const json = await response.json()

  if (!json.ok) {
    throw new Error("Failed to fetch listing detail")
  }

  return json
}

export default fetchListingDetail
