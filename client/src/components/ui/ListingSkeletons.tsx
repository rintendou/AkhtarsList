// Components
import ListingCardSkeleton from "./ListingCardSkeleton"

const ListingSkeletons = () => {
  const skeletons = []

  for (let i = 0; i < 30; i++) {
    skeletons.push(<ListingCardSkeleton key={i} />)
  }

  return (
    <ul className="flex gap-8 py-5 flex-wrap mx-auto container">{skeletons}</ul>
  )
}

export default ListingSkeletons
