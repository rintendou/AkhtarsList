import React from "react"

type Props = {
  children: React.ReactNode
  href: string
}

const TechnologyWrapper = ({ children, href }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 duration-200 ease-in-out"
    >
      {children}
    </a>
  )
}

export default TechnologyWrapper
