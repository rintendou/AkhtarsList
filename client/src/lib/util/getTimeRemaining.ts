interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeRemaining(expireAt: Date): TimeRemaining {
  const totalSeconds = Math.floor(
    (new Date(expireAt).getTime() - Date.now()) / 1000
  )
  const days = Math.floor(totalSeconds / (24 * 60 * 60))
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24)
  const minutes = Math.floor((totalSeconds / 60) % 60)
  const seconds = Math.floor(totalSeconds % 60)
  return { days, hours, minutes, seconds }
}

export default getTimeRemaining
