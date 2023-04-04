type Props = {
  img: string
  title: string
}

const PreviewImageContainer = ({ img, title }: Props) => {
  return (
    <div className="flex-auto p-10 text-center capitalize text-2xl font-semibold max-w-none md:max-w-[50%] max-h-[50%] md:max-h-none cursor-pointer group">
      <h1 className="capitalize">{title}</h1>
      <img
        src={img}
        alt={title}
        className="h-full p-5 group-hover:animate-pulse duration-200 ease-in-out"
      />
    </div>
  )
}

export default PreviewImageContainer
