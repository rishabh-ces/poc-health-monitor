'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Device, DeviceTelemetry } from '@/lib/types'
import { DATA_FETCH_INTERVAL } from '@/lib/constants'
import { fetchDeviceTelemetry } from '@/services/deviceAPI'
import TelemetryStats from '@/components/TelemetryStats'
import StatusBadge from '@/components/StatusBadge'
import DetailsCardSkeleton from './DetailsCardSkeleton'
import { hasAlert } from '@/lib/utils'

export default function DetailsCard({ device }: { device: Device }) {
  const [telemetry, setTelemetry] = useState<DeviceTelemetry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTelemetry = async () => {
      try {
        setError(null)
        const data = await fetchDeviceTelemetry(device.id)
        setTelemetry(data)
      } catch (err) {
        console.error('Error fetching telemetry:', err)
        setError('Failed to load telemetry data.')
      } finally {
        setIsLoading(false)
      }
    }

    const isDeviceActive = device.status === 'online'
    if (isDeviceActive) {
      // Initial fetch for active devices
      const initialLoad = async () => {
        setIsLoading(true)
        await loadTelemetry()
        setIsLoading(false)
      }
      initialLoad()

      // Set up the polling interval
      const intervalId = setInterval(loadTelemetry, DATA_FETCH_INTERVAL)

      // The cleanup function will stop the interval if the status changes or the component unmounts
      return () => clearInterval(intervalId)
    } else {
      // If the device is offline or in error, set a clear state and do not poll
      setIsLoading(false)
      setTelemetry(null)
      setError(
        `Device is currently in ${device.status}. Live telemetry is unavailable. Please come back later.`,
      )
    }
  }, [device.id, device.status])

  if (isLoading) return <DetailsCardSkeleton />

  return (
    <section
      className={`rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/50 ${
        hasAlert(device)
          ? 'border-red-500/50 ring-2 ring-red-500/30'
          : 'border-gray-200 dark:border-gray-800'
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {device.name}
          </h2>
          <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={12} /> {device.location}
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Last Updated:{' '}
            {new Date(device.lastUpdated).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
        <StatusBadge status={device.status} />
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />
      <Image
        src={`https://picsum.photos/seed/picsum/800/100`}
        alt={device.name}
        width={800}
        height={100}
        quality={100}
        loading="lazy"
      />
      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          Fetching telemetry...
        </div>
      ) : error ? (
        <div className="py-6 text-center text-sm text-red-400">{error}</div>
      ) : telemetry ? (
        <TelemetryStats telemetry={telemetry} />
      ) : (
        <div className="py-6 text-center text-gray-500">
          No telemetry data available.
        </div>
      )}
    </section>
  )
}
