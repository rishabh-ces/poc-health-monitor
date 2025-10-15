import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TelemetryStats from '../TelemetryStats'
import { DeviceTelemetry } from '@/lib/types'
import { BATTERY_ALERT_THRESHOLD, TEMP_ALERT_THRESHOLD } from '@/lib/constants'

// 1. Mock the lucide-react library
// This replaces the actual SVG icons with simple placeholders we can easily find.
jest.mock('lucide-react', () => ({
  Thermometer: () => <span>Thermometer Icon</span>,
  BatteryFull: () => <span>BatteryFull Icon</span>,
  BatteryMedium: () => <span>BatteryMedium Icon</span>,
  BatteryLow: () => <span>BatteryLow Icon</span>,
  SignalHigh: () => <span>SignalHigh Icon</span>,
  SignalMedium: () => <span>SignalMedium Icon</span>,
  SignalLow: () => <span>SignalLow Icon</span>,
}))

// --- Mock Data ---
const baseTelemetry: DeviceTelemetry = {
  deviceId: 'test-001',
  timestamp: new Date().toISOString(),
  battery: 50,
  temperature: 30,
  signalStrength: 'good',
}

describe('TelemetryStats Component', () => {
  describe('Battery Display', () => {
    it('should render a medium battery icon and no alert for a normal battery level', () => {
      render(<TelemetryStats telemetry={baseTelemetry} />)
      expect(screen.getByText('BatteryMedium Icon')).toBeInTheDocument()
      expect(screen.queryByText('Low')).not.toBeInTheDocument()
      expect(screen.queryByText('Full')).not.toBeInTheDocument()
    })

    it('should render a low battery icon and a "Low" alert when below the threshold', () => {
      const lowBatteryTelemetry = {
        ...baseTelemetry,
        battery: BATTERY_ALERT_THRESHOLD - 1,
      }
      render(<TelemetryStats telemetry={lowBatteryTelemetry} />)
      expect(screen.getByText('BatteryLow Icon')).toBeInTheDocument()
      expect(screen.getByText('Low')).toBeInTheDocument()
    })

    it('should render a full battery icon and a "Full" alert when at 100%', () => {
      const fullBatteryTelemetry = { ...baseTelemetry, battery: 100 }
      render(<TelemetryStats telemetry={fullBatteryTelemetry} />)
      expect(screen.getByText('BatteryFull Icon')).toBeInTheDocument()
      expect(screen.getByText('Full')).toBeInTheDocument()
    })
  })

  describe('Temperature Display', () => {
    it('should render temperature normally without an alert', () => {
      render(<TelemetryStats telemetry={baseTelemetry} />)
      expect(
        screen.getByText(`${baseTelemetry.temperature}°C`),
      ).toBeInTheDocument()
      expect(screen.queryByText('Overheating')).not.toBeInTheDocument()
    })

    it('should render an "Overheating" alert when above the threshold', () => {
      const highTempTelemetry = {
        ...baseTelemetry,
        temperature: TEMP_ALERT_THRESHOLD + 1,
      }
      render(<TelemetryStats telemetry={highTempTelemetry} />)
      expect(screen.getByText('Overheating')).toBeInTheDocument()
    })
  })

  describe('Connectivity Display', () => {
    it('should render the correct icon for "Excellent" signal strength', () => {
      const excellentSignal = { ...baseTelemetry, signalStrength: 'excellent' }
      render(<TelemetryStats telemetry={excellentSignal} />)
      expect(screen.getByText('SignalHigh Icon')).toBeInTheDocument()
      expect(screen.getByText('excellent')).toBeInTheDocument()
    })

    it('should render the correct icon for "Poor" signal strength', () => {
      const poorSignal = { ...baseTelemetry, signalStrength: 'poor' }
      render(<TelemetryStats telemetry={poorSignal} />)
      expect(screen.getByText('SignalLow Icon')).toBeInTheDocument()
      expect(screen.getByText('poor')).toBeInTheDocument()
    })
  })
})
