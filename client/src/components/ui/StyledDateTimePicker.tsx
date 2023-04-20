import { useState } from "react"
import ReactDatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

type Props = {
  onChange: (date: Date | null) => void
  initialDate?: Date | null
}

const StyledDateTimePicker = ({ onChange, initialDate }: Props) => {
  const [startDate, setStartDate] = useState(
    initialDate
      ? new Date(initialDate)
      : () => {
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(23)
          tomorrow.setMinutes(59)
          return tomorrow
        }
  )

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const handleDateChange = (date: Date) => {
    onChange(date)
    setStartDate(date)
  }

  return (
    <div className="relative">
      <h1 className="absolute text-xs left-6 top-1">Expires At:</h1>
      <ReactDatePicker
        selected={startDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        timeCaption="time"
        timeInputLabel="Expiration: "
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date()}
        maxTime={
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23,
            59
          )
        }
        minTime={today.getHours() < 23 ? today : tomorrow}
        withPortal
        className="pt-5 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 pl-5 rounded-md"
      />
    </div>
  )
}

export default StyledDateTimePicker
