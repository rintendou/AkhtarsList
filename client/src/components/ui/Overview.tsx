import React from "react"

type Props = {
  children: React.ReactNode
  twClasses?: string
}

const Overview = ({ children, twClasses }: Props) => {
  return <div className={`text-center ${twClasses}`}>{children}</div>
}

export default Overview
