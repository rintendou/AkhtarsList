const fetchListingDetail = async (listingId: string) => {
  const response = await fetch(
    `https://rvyt24-${
      import.meta.env.VITE_BACKEND_SERVER_PORT
    }.csb.app/api/listing/fetch/${listingId}`
  )
  const json = await response.json()

  if (!json.ok) {
    throw new Error("Failed to fetch listing detail")
  }

  return json
}

export default fetchListingDetail
