import { NextResponse } from 'next/server'
import type { DeviceTelemetry } from '@/lib/types'

const generateMockTelemetry = (deviceId: string): DeviceTelemetry => {
  const battery = Math.floor(Math.random() * (100 - 15 + 1) + 15) // 15–100
  const temperature = parseFloat((Math.random() * (50 - 10) + 10).toFixed(1)) // 10–50°C
  const connectivity = ['excellent', 'good', 'poor'][
    Math.floor(Math.random() * 3)
  ] as 'excellent' | 'good' | 'poor'

  // Random alerts
  const alerts: string[] = []
  if (battery < 20) alerts.push('Low Battery')
  if (temperature > 45) alerts.push('Overheating')
  if (connectivity === 'poor') alerts.push('Weak Signal')
  if (Math.random() < 0.05) alerts.push('Calibration Required') // 5% chance

  return {
    deviceId,
    timestamp: new Date().toISOString(),
    battery,
    temperature,
    connectivity,
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id: deviceId } = await params

  if (!deviceId) {
    return NextResponse.json(
      { error: 'Device ID is required' },
      { status: 400 },
    )
  }

  const telemetry = generateMockTelemetry(deviceId)
  return NextResponse.json(telemetry)
}
