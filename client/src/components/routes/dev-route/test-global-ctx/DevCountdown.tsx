import useListingDetail from "./useListingDetail"

const DevCountdown = () => {
  const { timeRemaining } = useListingDetail()
  const { days, hours, minutes, seconds } = timeRemaining

  return (
    <p className="text-lg font-semibold truncate">
      {days} d, {hours} h, {minutes} m, {seconds} s
    </p>
  )
}

export default DevCountdown
