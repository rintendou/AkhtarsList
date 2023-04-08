import DragAndDrop from "../../../ui/DragAndDrop"

const ImageContainer = () => {
  return (
    <div className="flex-auto p-10 text-center capitalize text-2xl font-semibold max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none cursor-pointer flex items-center justify-center">
      <DragAndDrop />
    </div>
  )
}

export default ImageContainer
