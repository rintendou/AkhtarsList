import TimelineContextProvider from "../../lib/store/TimelineContext"
import AuthContextProvider from "../../lib/store/AuthContext"
import ProfileContextProvider from "../../lib/store/ProfileContext"
import ThemeContextProvider from "../../lib/store/ThemeContext"

type Props = {
  children: React.ReactNode
}

const GlobalContextProviderLayout = ({ children }: Props) => {
  return (
    <ThemeContextProvider>
      <TimelineContextProvider>
        <AuthContextProvider>
          <ProfileContextProvider>{children}</ProfileContextProvider>
        </AuthContextProvider>
      </TimelineContextProvider>
    </ThemeContextProvider>
  )
}

export default GlobalContextProviderLayout
