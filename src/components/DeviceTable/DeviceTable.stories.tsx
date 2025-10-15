import type { Meta, StoryObj } from '@storybook/nextjs'
import DeviceTable from '../DeviceTable'
import type { Device } from '@/lib/types'
import { BATTERY_ALERT_THRESHOLD } from '@/lib/constants'

// --- Mock Data ---
const mockDevices: Device[] = [
  {
    id: 'factory-001',
    name: 'Factory Sensor A',
    status: 'online',
    location: 'Assembly Line 1',
    lastUpdated: new Date().toISOString(),
    battery: 85,
    temperature: 25,
    signalStrength: 'poor',
  },
  {
    id: 'warehouse-003',
    name: 'Humidity Sensor',
    status: 'error',
    location: 'Storage Aisle 12',
    lastUpdated: new Date('2025-10-13T10:00:00Z').toISOString(),
    battery: BATTERY_ALERT_THRESHOLD - 5,
    temperature: 28,
    signalStrength: 'good',
  },
  {
    id: 'factory-002',
    name: 'Factory Sensor B',
    status: 'offline',
    location: 'Assembly Line 2',
    lastUpdated: new Date('2025-10-12T15:30:00Z').toISOString(),
    battery: 0,
    temperature: 0,
    signalStrength: 'excellent',
  },
]

// --- Storybook Meta Configuration ---
const meta: Meta<typeof DeviceTable> = {
  title: 'Components/DeviceTable',
  component: DeviceTable,
  tags: ['autodocs'],
  argTypes: {
    devices: {
      control: 'object',
      description: 'An array of device objects to display in the table.',
    },
  },
}

export default meta
type Story = StoryObj<typeof DeviceTable>

/**
 * The default view of the table with a standard list of devices.
 */
export const Default: Story = {
  args: {
    devices: mockDevices,
  },
}

/**
 * The table's appearance when there are no devices to display.
 */
export const EmptyState: Story = {
  args: {
    devices: [],
  },
}

/**
 * A view with a larger number of devices to test scrolling and density.
 */
export const WithManyDevices: Story = {
  args: {
    devices: [
      ...mockDevices,
      { ...mockDevices[0], id: 'factory-004', name: 'Boiler Pressure Sensor' },
      {
        ...mockDevices[1],
        id: 'warehouse-001',
        name: 'Warehouse Temp Sensor',
        status: 'online',
        battery: 65,
      },
      { ...mockDevices[2], id: 'wind-002', name: 'Wind Speed Sensor' },
    ],
  },
}
