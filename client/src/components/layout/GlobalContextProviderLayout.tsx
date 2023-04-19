import TimelineContextProvider from "../../lib/store/TimelineContext"
import AuthContextProvider from "../../lib/store/AuthContext"
import ProfileContextProvider from "../../lib/store/ProfileContext"

type Props = {
  children: React.ReactNode
}

const GlobalContextProviderLayout = ({ children }: Props) => {
  return (
    <TimelineContextProvider>
      <AuthContextProvider>
        <ProfileContextProvider>{children}</ProfileContextProvider>
      </AuthContextProvider>
    </TimelineContextProvider>
  )
}

export default GlobalContextProviderLayout
