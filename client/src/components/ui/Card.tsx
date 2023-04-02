import React from "react"

type Props = {
  children: React.ReactNode
  twClasses?: string
}

const Card = ({ children, twClasses }: Props) => {
  return <div className={`rounded-md shadow-md ${twClasses} `}>{children}</div>
}

export default Card
