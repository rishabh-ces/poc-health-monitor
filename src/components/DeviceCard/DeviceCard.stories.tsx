import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DeviceCard from './DeviceCard'
import { Device, DeviceTelemetry } from '@/lib/types'

// --- Mock Data for Stories ---
const mockDevice: Device = {
  id: 'factory-001',
  name: 'Factory Sensor A',
  status: 'online',
  lastUpdated: new Date().toISOString(),
  location: 'Factory',
  battery: 85,
  temperature: 25,
  signalStrength: 'Good',
}

const mockTelemetry: DeviceTelemetry = {
  deviceId: 'factory-001',
  timestamp: new Date().toISOString(),
  battery: 85,
  temperature: 25,
  connectivity: 'excellent',
}

// --- Create a fake hook provider ---
const TelemetryContext = React.createContext<any>(null)

const TelemetryProvider = ({
  value,
  children,
}: {
  value: any
  children: React.ReactNode
}) => (
  <TelemetryContext.Provider value={value}>
    <div className="w-75">{children}</div>
  </TelemetryContext.Provider>
)

// --- Storybook Meta ---
const meta: Meta<typeof DeviceCard> = {
  title: 'Components/DeviceCard',
  component: DeviceCard,
  tags: ['autodocs'],
  args: { device: mockDevice },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Device Card having details of individual device.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DeviceCard>

// --- Stories ---
export const Default: Story = {
  args: {
    device: mockDevice,
    telemetryOverride: { isLoading: false, telemetry: mockTelemetry },
  },
}

export const Loading: Story = {
  args: {
    device: mockDevice,
    telemetryOverride: { isLoading: true, telemetry: null },
  },
}

export const Success: Story = {
  args: {
    device: mockDevice,
    telemetryOverride: { isLoading: false, telemetry: mockTelemetry },
  },
}

export const Alert: Story = {
  args: {
    device: mockDevice,
    telemetryOverride: {
      isLoading: false,
      telemetry: { ...mockTelemetry, battery: 10 }, // force alert
    },
  },
}

// --- Decorator ---
meta.decorators = [
  (Story, context) => (
    <TelemetryProvider value={context.parameters.telemetryData}>
      <Story />
    </TelemetryProvider>
  ),
]
