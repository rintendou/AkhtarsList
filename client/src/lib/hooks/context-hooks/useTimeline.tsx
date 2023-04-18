import { useContext } from "react"
import { TimelineContext } from "../../store/TimelineContext"

const useTimeline = () => {
  return useContext(TimelineContext)
}

export default useTimeline
