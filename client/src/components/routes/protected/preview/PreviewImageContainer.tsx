// Assets
import RandomListingImage from "../../../../../public/random-listing-image-undraw.svg"

// Types
type Props = {
  img: string
  title: string
}

const PreviewImageContainer = ({ img, title }: Props) => {
  return (
    <div className="flex-auto p-10 text-center capitalize text-2xl font-semibold cursor-pointer flex flex-col justify-center">
      <h1 className="capitalize">{title}</h1>
      <img
        src={img.length !== 0 ? img : RandomListingImage}
        alt={title}
        className="h-full min-h-[50rem] w-auto p-5"
      />
    </div>
  )
}

export default PreviewImageContainer
