// Types
type Props = {
  children: React.ReactNode
  onClick: () => void
}

const ProfileButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-10 py-5 hover:bg-blue-200 duration-100 ease-in-out hover:shadow-sm w-full dark:hover:bg-tertiary"
      type="button"
    >
      {children}
    </button>
  )
}

export default ProfileButton
