'use client'

import type { DeviceTelemetry } from '@/lib/types'
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

export default function TelemetryStats({
  telemetry,
}: {
  telemetry: DeviceTelemetry
}) {
  const getBatteryStatus = (batteryLevel: number) => {
    if (batteryLevel > 99) {
      return { Icon: BatteryFull, color: 'text-green-500', alert: 'Full' }
    }
    if (batteryLevel > BATTERY_ALERT_THRESHOLD) {
      return { Icon: BatteryMedium, color: 'text-gray-500', alert: null }
    }
    return { Icon: BatteryLow, color: 'text-red-500', alert: 'Low' }
  }

  const connectivityMap: Record<string, { Icon: any; color: string }> = {
    excellent: { Icon: SignalHigh, color: 'text-green-500' },
    good: { Icon: SignalMedium, color: 'text-yellow-500' },
    moderate: { Icon: SignalMedium, color: 'text-yellow-300' },
    poor: { Icon: SignalLow, color: 'text-red-500' },
  }

  const batteryStatus = getBatteryStatus(telemetry.battery)
  const tempColor =
    telemetry.temperature > TEMP_ALERT_THRESHOLD
      ? 'text-red-500'
      : 'text-gray-400'
  const tempAlert =
    telemetry.temperature > TEMP_ALERT_THRESHOLD ? 'Overheating' : null
  const connectivityStatus =
    connectivityMap[telemetry.signalStrength] || connectivityMap.poor

  const BatteryIcon = batteryStatus.Icon
  const ConnectivityIcon = connectivityStatus.Icon

  return (
    <div className="space-y-3 text-sm">
      {/* Battery */}
      <div className="flex items-center">
        <BatteryIcon
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
        <ConnectivityIcon
          className={`mr-2 h-4 w-4 ${connectivityStatus.color}`}
          aria-label="connectivity icon"
        />
        <span className="font-medium text-gray-700 capitalize dark:text-gray-300">
          {telemetry.signalStrength}
        </span>
      </div>
    </div>
  )
}
