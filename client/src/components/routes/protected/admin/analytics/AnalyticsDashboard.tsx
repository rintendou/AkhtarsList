import AnalyticsDisputes from "./AnalyticsDisputes"
import AnalyticsReport from "./AnalyticsReport"
import AnalyticsTransactions from "./AnalyticsTransactions"
import AnalyticsUsers from "./AnalyticsUsers"

const AnalyticsDashboard = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-10">
      <h1 className="text-4xl font-bold pb-5 border-b-2 w-full">Analytics</h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <AnalyticsReport />
        <AnalyticsUsers />
      </div>
      <AnalyticsTransactions />
      <AnalyticsDisputes />
    </div>
  )
}

export default AnalyticsDashboard
