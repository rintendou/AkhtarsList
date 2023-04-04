import { useState } from "react"
import ReactDatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

type Props = {
  onChange: (date: Date | null) => void
}

const StyledDateTimePicker = ({ onChange }: Props) => {
  const [startDate] = useState(new Date())

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const handleDateChange = (date: Date | null) => {
    onChange(date)
  }

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      timeInputLabel="Expiration: "
      dateFormat="MMMM d, yyyy h:mm aa"
      minDate={new Date()}
      maxTime={
        new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59)
      }
      minTime={today.getHours() < 23 ? today : tomorrow}
      withPortal
      className="pt-3 p-2 block w-full px-0 mt-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-secondary border-gray-200 pl-3"
    />
  )
}

export default StyledDateTimePicker
