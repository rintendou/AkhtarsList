import Card from "../../ui/Card"
import Overview from "../../ui/Overview"
import RouterLink from "../../ui/RouterLink"

const LoginRegister = () => {
  return (
    <Card twClasses="w-fit mx-auto p-20 border-4 border-secondary ">
      <Overview twClasses="space-y-10">
        <h1 className="text-5xl font-bold">Do you have an account with us?</h1>
        <div className="flex flex-row gap-10 justify-center">
          <RouterLink
            to="/login"
            routerLinkText="Login"
            twClasses="w-32 font-bold text-lg text-primary bg-secondary rounded-md py-2 hover:scale-105 duration-200 ease-in-out"
          />
          <RouterLink
            to="/register"
            routerLinkText="Register"
            twClasses="w-32 font-bold text-lg text-secondary bg-primary rounded-md py-2 border-2 border-secondary hover:scale-105 duration-200 ease-in-out"
          />
        </div>
      </Overview>
    </Card>
  )
}

export default LoginRegister
