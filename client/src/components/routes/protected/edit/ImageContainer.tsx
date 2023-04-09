import ImageUpload from "../../../../../public/image-upload-undraw.svg"

const ImageContainer = () => {
  return (
    <div className="flex-auto p-10 text-center capitalize text-2xl font-semibold max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none cursor-pointer group">
      <h1>Upload your item image here</h1>
      <img
        src={ImageUpload}
        alt="Upload Image Here"
        className="h-full p-5 my-20 md:my-0 group-hover:animate-pulse duration-200 ease-in-out"
      />
    </div>
  )
}

export default ImageContainer
