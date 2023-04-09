import TimeRemaingType from "../../../lib/types/TimeRemainingType"

type Props = {
  timeRemaining: TimeRemaingType
}

const DevCountdown = ({ timeRemaining }: Props) => {
  const { days, hours, minutes, seconds } = timeRemaining

  return (
    <p className="text-lg font-semibold truncate">
      {days} d, {hours} h, {minutes} m, {seconds} s
    </p>
  )
}

export default DevCountdown
