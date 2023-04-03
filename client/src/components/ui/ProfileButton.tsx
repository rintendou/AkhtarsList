type Props = {
  children: React.ReactNode
  onClick: () => void
  twClasses?: string
}

const ProfileButton = ({ children, onClick, twClasses }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${twClasses} px-4 py-2`}
      type="button"
    >
      {children}
    </button>
  )
}

export default ProfileButton
