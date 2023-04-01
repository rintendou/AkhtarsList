import RouterLink from "../../ui/RouterLink"

const LetsGetStarted = () => {
  return (
    <div className="flex justify-center items-center h-56">
      <RouterLink
        to="/app"
        routerLinkText="Let's get started!"
        twClasses="text-4xl bg-secondary text-primary px-10 py-6 rounded-xl"
      />
    </div>
  )
}

export default LetsGetStarted
