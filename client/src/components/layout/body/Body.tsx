type Props = {
  children: React.ReactNode
}

const Body = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex flex-col space-y-4 h-full dark:bg-secondary">
      <div className="h-20 bg-secondary dark:bg-black"></div>
      {children}
    </main>
  )
}

export default Body
