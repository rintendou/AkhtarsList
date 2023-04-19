import SortBy from "../../ui/SortBy"

type Props = {
  onSort: (key: string, isAscending: boolean) => void
}

const CategoryActions = ({ onSort }: Props) => {
  return (
    <div className="flex gap-5">
      <SortBy
        options={[
          { label: "Current Price", value: "Current Price" },
          { label: "Views", value: "Views" },
        ]}
        onSort={onSort}
      />
    </div>
  )
}

export default CategoryActions
