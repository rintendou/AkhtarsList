// Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Types
type Props = {
  images: string[]
}

// Constant Variables
const INTERVAL_TIME = 3000

const Carousel = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length)
    }, INTERVAL_TIME)

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval)
  }, [activeIndex])

  const prevImage = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length)
  }

  const nextImage = () => {
    setActiveIndex((activeIndex + 1) % images.length)
  }

  const navigate = useNavigate()

  return (
    <div className="relative h-80 w-full select-none">
      {/* left overlay */}
      <div
        className="absolute inset-y-0 left-0 z-10 flex items-center justify-center bg-black bg-opacity-0 cursor-pointer w-[20%] hover:bg-opacity-50 duration-200 group ease-in-out"
        onClick={prevImage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-16 h-16 bg-black opacity-20 rounded-full p-4 text-white group-hover:opacity-100 duration-200 ease-in-out caret-transparent"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      {/* right overlay */}
      <div
        className="absolute inset-y-0 right-0 z-10 flex items-center justify-center bg-black bg-opacity-0 cursor-pointer w-[20%] hover:bg-opacity-50 duration-200 group ease-in-out"
        onClick={nextImage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-16 h-16 bg-black opacity-20 rounded-full p-4 text-white group-hover:opacity-100 duration-200 ease-in-out caret-transparent"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={`carousel/${images[activeIndex]}`}
          alt={`Image ${activeIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() =>
            navigate(`/category/${cleanUpPathname(images[activeIndex])}`)
          }
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full mx-2 focus:outline-none bg-gray-500 ${
              activeIndex === index ? "bg-black" : ""
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

const cleanUpPathname = (pathname: string): string => {
  const dotIndex = pathname.lastIndexOf(".")
  if (dotIndex === -1) {
    // No file extension found
    return pathname
  } else {
    return pathname.slice(0, dotIndex - 1)
  }
}
