const fetchListingDetail = async (listingId: string) => {
  const response = await fetch(
    `http://localhost:${
      import.meta.env.VITE_BACKEND_SERVER_PORT
    }/api/listing/fetch/${listingId}`
  )
  const json = await response.json()

  if (!json.ok) {
    throw new Error("Failed to fetch listing detail")
  }

  return json
}

export default fetchListingDetail
