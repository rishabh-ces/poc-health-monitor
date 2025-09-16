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

export type Connectivity = 'excellent' | 'good' | 'poor'

export type Telemetry = {
  temperature: number
  battery: number
  connectivity: Connectivity
}

export type DeviceTelemetry = Telemetry & {
  deviceId: string
  timestamp: string
}
