// Packages
import React from "react"

// Types
type Props = {
  imageUrl: string
  onFileSelection: (f: File | null) => void
  setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

// Assets
import ImageUpload from "../../../public/image-upload-undraw.svg"

const DragAndDrop = ({ imageUrl, onFileSelection, setImageUrl }: Props) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
    onFileSelection(file)
  }

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation()
    setImageUrl("")
  }

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.preventDefault()
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files![0]
      onFileSelection(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  return (
    <div
      className="relative flex justify-center items-center  h-[35em] w-[35em] max-w-none md:max-w-[50%] max-h-full md:max-h-none cursor-pointer select-none group my-auto mx-auto p-4"
      onDrop={handleDrop}
      onClick={handleClick}
      onDragOver={(event) => event.preventDefault()}
    >
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            className="h-full w-full absolute inset-0 object-contain"
          />
          <button
            className="absolute top-2 right-2 rounded-full bg-white border-2 border-black p-1 z-10 hover:bg-black hover:border-white group duration-200 ease-in-out opacity-30"
            onClick={handleRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black group-hover:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 11.414l4.95 4.95 1.414-1.414L11.414 10l4.95-4.95-1.414-1.414L10 8.586 5.05 3.636 3.636 5.05 8.586 10l-4.95 4.95 1.414 1.414L10 11.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      ) : (
        <div>
          <img
            src={ImageUpload}
            alt="Upload Image Here"
            className="h-full w-auto p-5 my-20 md:my-0 group-hover:animate-pulse"
          />
          <h1 className="text-2xl font-semibold text-center group-hover:underline duration-200 ease-in-out">
            Upload Listing Image Here:
          </h1>
        </div>
      )}
    </div>
  )
}

export default DragAndDrop
