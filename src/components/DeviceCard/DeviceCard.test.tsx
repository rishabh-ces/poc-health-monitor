// src/components/DeviceCard.test.tsx

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DeviceCard from './DeviceCard'
import { Device, DeviceTelemetry } from '@/lib/types'

// Mock child components to keep the test focused on DeviceCard's logic
jest.mock('./StatusBadge/StatusBadge', () => ({
  __esModule: true,
  default: ({ status }: { status: string }) => <div>Status: {status}</div>,
}))

jest.mock('./TelemetryStats', () => ({
  __esModule: true,
  default: () => <div>Telemetry Stats Component</div>,
}))

// --- Mock Data ---
const mockDevice: Device = {
  id: 'factory-001',
  name: 'Factory Sensor A',
  status: 'online',
  lastUpdated: new Date().toISOString(),
}

const mockTelemetry: DeviceTelemetry = {
  deviceId: 'factory-001',
  timestamp: new Date().toISOString(),
  battery: 85,
  temperature: 25,
  connectivity: 'excellent',
}

describe('DeviceCard Component', () => {
  it('should always render the basic device name, id, and status', () => {
    // Arrange & Act
    render(<DeviceCard device={mockDevice} />)

    // Assert
    expect(screen.getByText('Factory Sensor A')).toBeInTheDocument()
    expect(screen.getByText('factory-001')).toBeInTheDocument()
    expect(screen.getByText('Status: online')).toBeInTheDocument()
  })

  it('should render the loading skeleton when isLoading is true', () => {
    // Arrange & Act
    render(
      <DeviceCard
        device={mockDevice}
        telemetryOverride={{ isLoading: true, telemetry: null }}
      />,
    )

    // Assert
    // The best way to find the skeleton is by its pulsing animation class
    const skeleton = document.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
    expect(
      screen.queryByText('Telemetry Stats Component'),
    ).not.toBeInTheDocument()
  })

  it('should render the TelemetryStats component on successful data load', () => {
    // Arrange & Act
    render(
      <DeviceCard
        device={mockDevice}
        telemetryOverride={{ isLoading: false, telemetry: mockTelemetry }}
      />,
    )

    // Assert
    expect(screen.getByText('Telemetry Stats Component')).toBeInTheDocument()
    expect(screen.queryByText(/Failed to load/i)).not.toBeInTheDocument()
  })

  it('should render the error message when loading is false and telemetry is null', () => {
    // Arrange & Act
    render(
      <DeviceCard
        device={mockDevice}
        telemetryOverride={{ isLoading: false, telemetry: null }}
      />,
    )

    // Assert
    expect(
      screen.getByText('Failed to load telemetry data.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Telemetry Stats Component'),
    ).not.toBeInTheDocument()
  })

  it('should apply alert styles when telemetry data crosses a threshold', () => {
    // Arrange
    const alertTelemetry = { ...mockTelemetry, battery: 15 } // Low battery

    // Act
    const { container } = render(
      <DeviceCard
        device={mockDevice}
        telemetryOverride={{ isLoading: false, telemetry: alertTelemetry }}
      />,
    )

    // Assert
    // Check for the presence of the ring/alert classes on the main element
    const cardElement = container.firstChild
    expect(cardElement).toHaveClass('ring-2 ring-red-500/20')
  })
})
