import type { Meta, StoryObj } from '@storybook/nextjs'
import DeviceCard from '../DeviceCard'
import type { Device } from '@/lib/types'
import { BATTERY_ALERT_THRESHOLD } from '@/lib/constants'

// --- Mock Data for Stories ---

const baseDevice: Device = {
  id: 'factory-001',
  name: 'Factory Sensor A',
  location: 'Assembly Line 1',
  status: 'online',
  battery: 85,
  temperature: 25,
  signalStrength: 'good',
  lastUpdated: new Date().toISOString(),
}

// --- Storybook Meta Configuration ---

const meta: Meta<typeof DeviceCard> = {
  title: 'Components/DeviceCard',
  component: DeviceCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    device: {
      control: 'object',
      description: 'The device object containing all necessary information.',
    },
  },
}

export default meta
type Story = StoryObj<typeof DeviceCard>

// --- Stories for Each Component State ---

/**
 * A showcase of the DeviceCard in its various states for easy comparison.
 */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:w-[800px]">
      <DeviceCard device={baseDevice} />
      <DeviceCard
        device={{
          ...baseDevice,
          id: 'warehouse-003',
          name: 'Humidity Sensor',
          battery: BATTERY_ALERT_THRESHOLD - 5, // Trigger alert
          status: 'error',
        }}
      />
      <DeviceCard
        device={{
          ...baseDevice,
          id: 'factory-002',
          name: 'Factory Sensor B',
          status: 'offline',
        }}
      />
      <DeviceCard
        device={{
          ...baseDevice,
          id: 'remote-005',
          name: 'Battery Backup Node',
          status: 'maintenance',
        }}
      />
    </div>
  ),
}

/**
 * The default view of the card for a healthy, online device.
 */
export const Online: Story = {
  args: {
    device: baseDevice,
  },
}

/**
 * The view of the card when an alert is triggered (e.g., low battery).
 * Note the red ring and uppercase title.
 */
export const Alert: Story = {
  args: {
    device: {
      ...baseDevice,
      id: 'warehouse-003',
      name: 'Humidity Sensor',
      battery: BATTERY_ALERT_THRESHOLD - 5, // Assumes threshold is 20
      status: 'error',
    },
  },
}

/**
 * The view of the card when the device is offline.
 */
export const Offline: Story = {
  args: {
    device: {
      ...baseDevice,
      id: 'factory-002',
      name: 'Factory Sensor B',
      status: 'offline',
    },
  },
}
