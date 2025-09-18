'use client'

import type { Telemetry } from '@/lib/types'
import {
  Thermometer,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  SignalHigh,
  SignalMedium,
  SignalLow,
} from 'lucide-react'
import { BATTERY_ALERT_THRESHOLD, TEMP_ALERT_THRESHOLD } from '@/lib/constants'

const TelemetryStats = ({ telemetry }: { telemetry: Telemetry }) => {
  const getBatteryStatus = (batteryLevel: number) => {
    if (batteryLevel > 99) {
      return { icon: BatteryFull, color: 'text-green-500', alert: 'Full' }
    }
    if (batteryLevel > BATTERY_ALERT_THRESHOLD) {
      return { icon: BatteryMedium, color: 'text-gray-500', alert: null }
    }
    return { icon: BatteryLow, color: 'text-red-500', alert: 'Low' }
  }

  const connectivityMap = {
    excellent: { icon: SignalHigh, color: 'text-green-500' },
    good: { icon: SignalMedium, color: 'text-yellow-500' },
    poor: { icon: SignalLow, color: 'text-red-500' },
  }

  const batteryStatus = getBatteryStatus(telemetry.battery)
  const tempColor =
    telemetry.temperature > TEMP_ALERT_THRESHOLD
      ? 'text-red-500'
      : 'text-gray-400'
  const tempAlert =
    telemetry.temperature > TEMP_ALERT_THRESHOLD ? 'Overheating' : null
  const connectivityStatus =
    connectivityMap[telemetry.connectivity] || connectivityMap.poor

  return (
    <div className="space-y-3 text-sm">
      {/* Battery */}
      <div className="flex items-center">
        <batteryStatus.icon
          className={`mr-2 h-4 w-4 ${batteryStatus.color}`}
          aria-label="battery level icon"
        />
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {telemetry.battery}%
        </span>
        {batteryStatus.alert && (
          <span
            className={`ml-auto text-xs font-semibold ${batteryStatus.color}`}
          >
            {batteryStatus.alert}
          </span>
        )}
      </div>

      {/* Temperature */}
      <div className="flex items-center">
        <Thermometer
          className={`mr-2 h-4 w-4 ${tempColor}`}
          aria-label="temperature icon"
        />
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {telemetry.temperature}°C
        </span>
        {tempAlert && (
          <span className="ml-auto text-xs font-semibold text-red-500">
            {tempAlert}
          </span>
        )}
      </div>

      {/* Connectivity */}
      <div className="flex items-center">
        <connectivityStatus.icon
          className={`mr-2 h-4 w-4 ${connectivityStatus.color}`}
          aria-label="connectivity icon"
        />
        <span className="font-medium text-gray-700 capitalize dark:text-gray-300">
          {telemetry.connectivity}
        </span>
      </div>
    </div>
  )
}

export default TelemetryStats
