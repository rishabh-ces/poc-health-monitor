import React, { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getDeviceById } from '@/lib/data'
import DetailsCard from '@/components/DetailsCard'
import DetailsCardSkeleton from '@/components/DetailsCardSkeleton'
import { DATA_FETCH_INTERVAL } from '@/lib/constants'

export default async function DeviceDetailPage({
  params,
}: {
  params: Promise<any>
}) {
  const { id: deviceId } = await params

  const device = getDeviceById(deviceId)

  if (!device) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Device Not Found</h1>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Go back to Dashboard
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mt-2">
          <Suspense fallback={<DetailsCardSkeleton />}>
            <DetailsCard device={device} />
          </Suspense>
        </div>
        {device.status !== 'error' && (
          <div className="mt-2">
            <p className="text-center text-xs text-gray-600 dark:text-gray-400">
              Real time device details refreshing every{' '}
              {DATA_FETCH_INTERVAL / 1000} seconds
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
