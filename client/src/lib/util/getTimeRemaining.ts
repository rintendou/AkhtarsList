function getTimeRemaining(expireAt: Date): string {
  const totalSeconds = Math.floor(
    (new Date(expireAt).getTime() - Date.now()) / 1000
  )
  const days = Math.floor(totalSeconds / (24 * 60 * 60))
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24)
  const minutes = Math.floor((totalSeconds / 60) % 60)
  const seconds = Math.floor(totalSeconds % 60)

  return `${days} d, ${hours}, ${minutes} m, ${seconds} s`
}

export default getTimeRemaining
