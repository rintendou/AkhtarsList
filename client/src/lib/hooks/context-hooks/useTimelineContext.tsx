// Hooks
import { useContext } from "react"

// Context
import { TimelineContext } from "../../store/TimelineContext"

const useTimelineContext = () => {
  return useContext(TimelineContext)
}

export default useTimelineContext
