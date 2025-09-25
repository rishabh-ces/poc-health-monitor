import { Suspense } from 'react'
import { DeviceGrid } from '@/components/DeviceGrid'
import { DeviceGridSkeleton } from '@/components/DeviceGridSkeleton'
import { DATA_FETCH_INTERVAL } from '@/lib/constants'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            IoT Devices Health Monitor
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            (real-time status and telemetry from all connected devices, updates
            every {DATA_FETCH_INTERVAL / 1000} seconds)
          </p>
        </div>

        <Suspense fallback={<DeviceGridSkeleton />}>
          <DeviceGrid />
        </Suspense>
      </div>
    </main>
  )
}

// use router & dark mode
