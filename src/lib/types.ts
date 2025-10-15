export type Status = 'online' | 'offline' | 'error' | 'maintenance'
type SignalStrength = 'good' | 'poor' | 'moderate' | 'excellent'

export type Device = {
  id: string
  name: string
  location: string
  status: Status
  battery: number // %
  temperature: number // °C
  signalStrength: SignalStrength
  lastUpdated: string
}

export type Telemetry = {
  temperature: number
  battery: number
  signalStrength: SignalStrength
}

export type DeviceTelemetry = Telemetry & {
  deviceId: string
  timestamp: string
}
