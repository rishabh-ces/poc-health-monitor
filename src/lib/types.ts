export type Device = {
  id: string
  name: string
  location: string
  status: 'online' | 'offline' | 'error'
  battery: number // %
  temperature: number // °C
  signalStrength: 'Good' | 'Poor' | 'Moderate' | 'Excellent'
  lastUpdated: string
}

export type DeviceTelemetry = {
  deviceId: string
  timestamp: string
  battery: number
  temperature: number
  connectivity: 'excellent' | 'good' | 'poor'
  alerts?: string[]
}
