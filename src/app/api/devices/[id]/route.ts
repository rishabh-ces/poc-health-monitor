import { NextResponse } from 'next/server'
import { DeviceTelemetry } from '@/lib/types'

export const generateMockTelemetry = (deviceId: string): DeviceTelemetry => {
  return {
    deviceId,
    timestamp: new Date().toISOString(),
    battery: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    temperature: parseFloat((Math.random() * (50 - 10) + 10).toFixed(1)),
    signalStrength: ['excellent', 'good', 'poor'][
      Math.floor(Math.random() * 3)
    ] as 'excellent' | 'good' | 'poor',
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id: deviceId } = await params
  const mockDevice = generateMockTelemetry(deviceId)

  return NextResponse.json(mockDevice)
}
