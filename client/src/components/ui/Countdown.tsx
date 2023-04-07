import React, { useState, useEffect } from "react"

type Props = {
  targetDate: string
}

type TimeRemaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Countdown = ({ targetDate }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining()
  )

  function calculateTimeRemaining(): TimeRemaining {
    const difference = +new Date(targetDate) - +new Date()
    let timeRemaining: TimeRemaining = {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const { days, hours, minutes, seconds } = timeRemaining

  return (
    <div>
      {days} days, {hours} hours, {minutes} minutes, {seconds} seconds left!
    </div>
  )
}

export default Countdown
