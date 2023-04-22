import Card from "../../../../ui/Card"

const AnalyticsUsers = () => {
  return (
    <Card twClasses="w-full p-4 h-full shadow-lg border-4 border-secondary space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Registered Users: </p>
          <p className="text-xs text-gray-600"> - Number of Listers: </p>
          <p className="text-xs text-gray-600"> - Number of Bidders: </p>
        </div>
      </div>
    </Card>
  )
}

export default AnalyticsUsers
