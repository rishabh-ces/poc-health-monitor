import { NextResponse } from 'next/server'
import { getDevices } from '@/lib/data'
import type { Device } from '@/lib/types'

// Helper function to simulate real-world status changes
const simulateStatusChanges = (devices: Device[]): Device[] => {
  const statuses: Device['status'][] = [
    'online',
    'offline',
    'error',
    'maintenance',
  ]

  return devices.map((device) => {
    // Give each device a ~20% chance to change status on each API call
    if (Math.random() < 0.2) {
      // Pick a new random status
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
      return {
        ...device,
        status: newStatus,
        lastUpdated: new Date().toISOString(), // Also update the timestamp
      }
    }
    // Return the device unchanged if it doesn't meet the random check
    return device
  })
}

export async function GET() {
  const staticDevices = getDevices()
  // Pass the static list through our simulator function
  const dynamicDevices = simulateStatusChanges(staticDevices)

  return NextResponse.json(dynamicDevices)
}
