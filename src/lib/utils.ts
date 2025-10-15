import { BATTERY_ALERT_THRESHOLD, TEMP_ALERT_THRESHOLD } from '@/lib/constants'
import { Device } from './types'

export const hasAlert = (device: Device) =>
  !['error', 'offline', 'maintenance'].includes(device.status) &&
  (device.battery <= BATTERY_ALERT_THRESHOLD ||
    device.temperature > TEMP_ALERT_THRESHOLD)
