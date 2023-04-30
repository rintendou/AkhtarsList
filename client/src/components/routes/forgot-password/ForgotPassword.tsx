// Components
import ScrollToTop from "../../../lib/util/components/ScrollToTop"
import ForgotPasswordForm from "./ForgotPasswordForm"

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <ScrollToTop />
      <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPassword
