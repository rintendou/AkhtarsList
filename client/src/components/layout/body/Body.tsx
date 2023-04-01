import React from "react"

type Props = {
  children: React.ReactNode
}

const Body = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col space-y-4 h-full">
      {children}
    </div>
  )
}

export default Body
