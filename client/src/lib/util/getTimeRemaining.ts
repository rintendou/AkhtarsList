function getTimeRemaining(expireAt: Date): string {
  const totalSeconds = Math.floor(
    (new Date(expireAt).getTime() - Date.now()) / 1000
  )
  if (totalSeconds < 0) {
    return "Expired"
  }
  const days = Math.floor(totalSeconds / (24 * 60 * 60))
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24)
  const minutes = Math.floor((totalSeconds / 60) % 60)

  return `Expires At: ${days} d, ${hours} h, ${minutes} m`
}

export default getTimeRemaining
