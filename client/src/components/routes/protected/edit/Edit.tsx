import EditActions from "./EditActions"
import ImageContainer from "./ImageContainer"

const Edit = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ImageContainer />
      <EditActions />
    </div>
  )
}

export default Edit
