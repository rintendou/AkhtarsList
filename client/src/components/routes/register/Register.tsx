import ScrollToTop from "../../../lib/util/components/ScrollToTop"
import RegisterForm from "./RegisterForm"

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <ScrollToTop />
      <RegisterForm />
    </div>
  )
}

export default Register
