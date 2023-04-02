import Collaborators from "./Collaborators"
import Headline from "./Headline"
import SubHeadline from "./subheadline/SubHeadline"

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Headline />
      <SubHeadline />
      <Collaborators />
    </div>
  )
}

export default LandingPage
