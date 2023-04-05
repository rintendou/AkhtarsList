import { useState } from "react"
import classNames from "classnames"

const IMAGES = [
  "sneakers.jpg",
  "antiques.jpg",
  "tech.jpg",
  "accessories.jpg",
  "collectibles.jpg",
  "assorted.jpg",
]

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const prevImage = () => {
    setActiveIndex((activeIndex - 1 + IMAGES.length) % IMAGES.length)
  }

  const nextImage = () => {
    setActiveIndex((activeIndex + 1) % IMAGES.length)
  }

  console.log(`carousel/${IMAGES[activeIndex]}`)

  return (
    <div className="relative h-96 w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={`carousel/${IMAGES[activeIndex]}`}
          alt={`Image ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={prevImage}
          className="bg-gray-800 bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="bg-gray-800 bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
          </svg>
        </button>
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
