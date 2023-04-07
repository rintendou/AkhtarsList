import { useState, useEffect } from "react"

type Props = {
  type: "success" | "warning" | "error"
  message: string
  duration?: number
}

const Alert = ({ type, message, duration = 5000 }: Props) => {
  let bgColor, borderColor, textColor

  switch (type) {
    case "success":
      bgColor = "bg-green-100"
      borderColor = "border-green-300"
      textColor = "text-green-800"
      break
    case "warning":
      bgColor = "bg-yellow-100"
      borderColor = "border-yellow-300"
      textColor = "text-yellow-800"
      break
    case "error":
      bgColor = "bg-red-100"
      borderColor = "border-red-300"
      textColor = "text-red-800"
      break
    default:
      bgColor = "bg-gray-100"
      borderColor = "border-gray-300"
      textColor = "text-gray-800"
  }

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => {
      clearTimeout(timeout)
    }
  }, [duration])

  return (
    <>
      {visible && (
        <div
          className={`border-l-4 p-4 ${bgColor} ${borderColor} ${textColor}`}
          role="alert"
        >
          <p className="font-bold">{type.toUpperCase()}</p>
          <p>{message}</p>
        </div>
      )}
    </>
  )
}

export default Alert
