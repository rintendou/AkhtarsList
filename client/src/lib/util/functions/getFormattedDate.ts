const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/New_York",
    timeZoneName: "short",
    weekday: "long",
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)
  return formattedDate
}

export default getFormattedDate
