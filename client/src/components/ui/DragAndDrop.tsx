import React, { useState } from "react"

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState<string>("")

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      style={{ width: "300px", height: "300px", border: "1px solid black" }}
    >
      {imageUrl ? (
        <img src={imageUrl} style={{ width: "100%", height: "100%" }} />
      ) : (
        <p>Drop an image here</p>
      )}
    </div>
  )
}

export default ImageUploader
