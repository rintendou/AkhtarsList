import TimeRemainingType from "../../types/TimeRemainingType"

function calculateTimeRemaining(expireAt: Date): TimeRemainingType {
  const difference = +new Date(expireAt) - +new Date()
  let timeRemaining: TimeRemainingType = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (difference > 0) {
    timeRemaining = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeRemaining
}

export default calculateTimeRemaining
