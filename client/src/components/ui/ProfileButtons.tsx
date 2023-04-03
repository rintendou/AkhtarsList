type Props = {
  children: React.ReactNode
  onClick: () => void
  buttonText: String
  twClasses?: string
  type?: "button" | "submit"
}

const StyledButton = ({
  children,
  onClick,
  twClasses,
  type = "button",
}: Props) => {
  return (
    <button onClick={onClick} className={`${twClasses} px-4 py-2`} type={type}>
      {children}
    </button>
  )
}

export default StyledButton
