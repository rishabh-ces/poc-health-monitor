import type { Device, DeviceTelemetry } from '@/lib/types'

export const fetchAllDevices = async (): Promise<Device[]> => {
  const res = await fetch('/api/devices')
  if (!res.ok) {
    throw new Error(`Failed to fetch all devices: ${res.statusText}`)
  }
  return res.json()
}

export const fetchDeviceTelemetry = async (
  id: string,
): Promise<DeviceTelemetry> => {
  const res = await fetch(`/api/devices/${id}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch telemetry: ${res.statusText}`)
  }
  return res.json()
}
