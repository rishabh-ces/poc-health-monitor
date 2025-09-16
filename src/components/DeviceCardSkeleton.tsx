export function DeviceCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800/50">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-start justify-between">
          <div className="h-5 w-2/3 rounded-md bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-5 w-14 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="mt-2 h-3 w-1/3 rounded-md bg-gray-300 dark:bg-gray-700"></div>

        {/* Telemetry Skeleton */}
        <div className="mt-6 space-y-3">
          <div className="h-4 w-3/4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-1/2 rounded-md bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-2/3 rounded-md bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  )
}
