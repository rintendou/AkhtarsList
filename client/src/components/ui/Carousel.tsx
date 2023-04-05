import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import classNames from "classnames"

const IMAGES = [
  "sneakers.jpg",
  "antiques.jpg",
  "tech.jpg",
  "accessories.jpg",
  "collectibles.jpg",
  "assorted.jpg",
]

const INTERVAL_TIME = 3000

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % IMAGES.length)
    }, INTERVAL_TIME)

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval)
  }, [activeIndex])

  const prevImage = () => {
    setActiveIndex((activeIndex - 1 + IMAGES.length) % IMAGES.length)
  }

  const nextImage = () => {
    setActiveIndex((activeIndex + 1) % IMAGES.length)
  }

  const navigate = useNavigate()

  return (
    <div className="relative h-96 w-full">
      {/* left overlay */}
      <div
        className="absolute inset-y-0 left-0 z-10 flex items-center justify-center bg-black bg-opacity-0 cursor-pointer w-[20%]"
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
          className="w-16 h-16 bg-black bg-opacity-20 rounded-full p-4"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      {/* right overlay */}
      <div
        className="absolute inset-y-0 right-0 z-10 flex items-center justify-center bg-black bg-opacity-0 cursor-pointer w-[20%]"
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
          className="w-16 h-16 bg-black bg-opacity-20 rounded-full p-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={`carousel/${IMAGES[activeIndex]}`}
          alt={`Image ${activeIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() =>
            navigate(`/category/${cleanUpPathname(IMAGES[activeIndex])}`)
          }
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={classNames(
              "w-3 h-3 rounded-full mx-2 focus:outline-none",
              {
                "bg-gray-800": activeIndex === index,
                "bg-gray-400": activeIndex !== index,
              }
            )}
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
    return pathname.slice(0, dotIndex)
  }
}
