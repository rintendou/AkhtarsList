import { useState } from "react"
import ReactDatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

const StyledDateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date())

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
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
