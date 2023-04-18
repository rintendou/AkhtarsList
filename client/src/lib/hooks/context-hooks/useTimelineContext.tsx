import { useContext } from "react"
import { TimelineContext } from "../../store/TimelineContext"

const useTimelineContext = () => {
  return useContext(TimelineContext)
}

export default useTimelineContext
