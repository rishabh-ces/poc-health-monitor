'use client'

import type { Device } from '@/lib/types'
import StatusBadge from '../StatusBadge/StatusBadge'
import useTelemetry from '@/hooks/useTelemetry'
import TelemetryStats from '../TelemetryStats'
import { BATTERY_ALERT_THRESHOLD, TEMP_ALERT_THRESHOLD } from '@/lib/constants'

const DeviceCard = ({
  device,
  telemetryOverride,
}: {
  device: Device
  telemetryOverride?: { telemetry: any; isLoading: boolean }
}) => {
  const { telemetry, isLoading } = telemetryOverride ?? useTelemetry(device.id)

  const hasAlert =
    !isLoading &&
    telemetry &&
    (telemetry.battery < BATTERY_ALERT_THRESHOLD ||
      telemetry.temperature > TEMP_ALERT_THRESHOLD)

  return (
    <div
      className={`group rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 ${
        hasAlert
          ? 'border-red-500/50 ring-2 ring-red-500/20'
          : 'border-gray-200 dark:border-gray-800'
      } `}
      role="group"
    >
      <div className="flex items-start justify-between">
        <h2
          className="text-base font-bold text-gray-800 dark:text-gray-100"
          aria-label="device name"
        >
          {device.name}
        </h2>
        <StatusBadge status={device.status} />
      </div>
      <p className="mb-4 font-mono text-xs text-gray-500 dark:text-gray-400">
        {device.id}
      </p>

      {isLoading ? (
        <div className="animate-pulse space-y-3 pt-2">
          <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        </div>
      ) : telemetry ? (
        <TelemetryStats telemetry={telemetry} />
      ) : (
        <div className="pt-2 text-sm font-medium text-red-600 dark:text-red-500">
          Failed to load telemetry data.
        </div>
      )}
    </div>
  )
}

export default DeviceCard
