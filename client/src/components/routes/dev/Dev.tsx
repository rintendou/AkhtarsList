import Card from "../../ui/Card"
import Error from "../../ui/Error"
import Overview from "../../ui/Overview"
import RouterLink from "../../ui/RouterLink"
import StyledButton from "../../ui/StyledButton"
import StyledInput from "../../ui/StyledInput"
import Success from "../../ui/Success"

const Dev = () => {
  return (
    <div className="space-y-20 max-w-sm mx-auto">
      <Overview>
        <h1 className="text-3xl font-bold">
          This route is for dev purposes only. This route shows the ui elements
          and an overview of their functionalities
        </h1>
      </Overview>

      <Card>Card Component</Card>

      <Overview>Overview Component</Overview>

      <RouterLink to="/gulag" routerLinkText="RouterLink Component" />

      <div className="flex flex-row gap-5">
        <StyledButton
          onClick={() => {
            console.log("Hello")
          }}
          buttonText="Primary Button"
          intent="primary"
        />
        <StyledButton
          onClick={() => {
            console.log("Hello")
          }}
          buttonText="Secondary Button"
          intent="secondary"
        />
      </div>

      <StyledInput name="Styled Input" type="text" placeholder="Styled Input" />

      <Error errorMessage="Error component" />

      <Success successMessage="Success component" />
    </div>
  )
}

export default Dev
