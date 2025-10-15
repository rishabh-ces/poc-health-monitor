import type { Meta, StoryObj } from '@storybook/nextjs'
import TelemetryStats from '../TelemetryStats'
import { DeviceTelemetry } from '@/lib/types'
import { BATTERY_ALERT_THRESHOLD, TEMP_ALERT_THRESHOLD } from '@/lib/constants'

// A base mock object for our telemetry data
const baseTelemetry: DeviceTelemetry = {
  deviceId: 'factory-001',
  timestamp: new Date().toISOString(),
  battery: 85,
  temperature: 25,
  signalStrength: 'good',
}

const meta: Meta<typeof TelemetryStats> = {
  title: 'Components/TelemetryStats',
  component: TelemetryStats,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    telemetry: {
      control: 'object',
      description: 'The telemetry data object for the device.',
    },
  },
}

export default meta
type Story = StoryObj<typeof TelemetryStats>

/**
 * The default state with normal operating values.
 */
export const Normal: Story = {
  args: {
    telemetry: baseTelemetry,
  },
}

/**
 * A state where the battery is low, triggering the red alert text and icon.
 */
export const LowBattery: Story = {
  args: {
    telemetry: {
      ...baseTelemetry,
      battery: BATTERY_ALERT_THRESHOLD - 5, // e.g., 15
    },
  },
}

/**
 * A state where the device is overheating, triggering the red alert text and icon.
 */
export const Overheating: Story = {
  args: {
    telemetry: {
      ...baseTelemetry,
      temperature: TEMP_ALERT_THRESHOLD + 10, // e.g., 55
    },
  },
}

/**
 * A state where the signal strength is poor.
 */
export const PoorSignal: Story = {
  args: {
    telemetry: {
      ...baseTelemetry,
      signalStrength: 'poor',
    },
  },
}

/**
 * A state where the battery is fully charged.
 */
export const FullBattery: Story = {
  args: {
    telemetry: {
      ...baseTelemetry,
      battery: 100,
    },
  },
}
