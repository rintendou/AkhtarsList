type Props = {
  onClick: () => void
  buttonText: string
  intent?: "primary" | "secondary"
  twClasses?: string
  type?: "button" | "submit"
  disabled?: boolean
}

const StyledButton = ({
  onClick,
  buttonText,
  intent = "primary",
  twClasses,
  type = "button",
  disabled = false,
}: Props) => {
  const isPrimaryClasses =
    intent === "primary"
      ? "bg-secondary text-primary"
      : "bg-primary text-secondary border-2 border-secondary"

  return (
    <button
      onClick={onClick}
      className={`${twClasses} px-4 py-2 rounded-lg hover:scale-105 duration-200 ease-in-out outline-none ${isPrimaryClasses} `}
      type={type}
      disabled={disabled}
    >
      {buttonText}
    </button>
  )
}

export default StyledButton
