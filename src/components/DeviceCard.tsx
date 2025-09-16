'use client'

import type { Device } from '@/lib/types'
import { StatusBadge } from './StatusBadge'
import useTelemetry from '@/hooks/useTelemetry'
import {
  Thermometer,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  SignalHigh,
  SignalMedium,
  SignalLow,
} from 'lucide-react'

const DeviceCard = ({ device }: { device: Device }) => {
  const { telemetry, isLoading } = useTelemetry(device.id)

  const hasAlert =
    !isLoading &&
    telemetry &&
    (telemetry.battery < 20 || telemetry.temperature > 45)

  return (
    <div
      className={`group rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 ${
        hasAlert
          ? 'border-red-500/50 ring-2 ring-red-500/20'
          : 'border-gray-200 dark:border-gray-800'
      } `}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
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
        <div className="space-y-3 text-sm">
          {/* Battery */}
          <div className="flex items-center">
            {telemetry.battery > 99 ? (
              <BatteryFull className="mr-2 h-4 w-4 text-green-500" />
            ) : telemetry.battery > 20 ? (
              <BatteryMedium className="mr-2 h-4 w-4 text-gray-500" />
            ) : (
              <BatteryLow className="mr-2 h-4 w-4 text-red-500" />
            )}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {telemetry.battery}%
            </span>
            {telemetry.battery <= 20 && (
              <span className="ml-auto text-xs font-semibold text-red-500">
                Low
              </span>
            )}
            {telemetry.battery > 99 && (
              <span className="ml-auto text-xs font-semibold text-green-500">
                Full
              </span>
            )}
          </div>
          {/* Temperature */}
          <div className="flex items-center">
            <Thermometer
              className={`mr-2 h-4 w-4 ${telemetry.temperature > 45 ? 'text-red-500' : 'text-gray-400'}`}
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {telemetry.temperature}°C
            </span>
            {telemetry.temperature > 45 && (
              <span className="ml-auto text-xs font-semibold text-red-500">
                Overheating
              </span>
            )}
          </div>
          {/* Connectivity */}
          <div className="flex items-center">
            {telemetry.connectivity === 'excellent' ? (
              <SignalHigh className="mr-2 h-4 w-4 text-green-500" />
            ) : telemetry.connectivity === 'good' ? (
              <SignalMedium className="mr-2 h-4 w-4 text-yellow-500" />
            ) : (
              <SignalLow className="mr-2 h-4 w-4 text-red-500" />
            )}
            <span className="font-medium text-gray-700 capitalize dark:text-gray-300">
              {telemetry.connectivity}
            </span>
          </div>
        </div>
      ) : (
        <div className="pt-2 text-sm font-medium text-red-600 dark:text-red-500">
          Failed to load telemetry data.
        </div>
      )}
    </div>
  )
}

export default DeviceCard
