import Card from "../../../../ui/Card"

const AnalyticsReport = () => {
  return (
    <Card twClasses="w-full p-4 h-full shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Report</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Total Listings: </p>
          <p className="text-xs text-gray-600"> - Active Listings: </p>
          <p className="text-xs text-gray-600"> - Expired Listings: </p>
        </div>
        <p>Pending Listings: </p>
        <p>Pending Disputes: </p>
      </div>
    </Card>
  )
}

export default AnalyticsReport
