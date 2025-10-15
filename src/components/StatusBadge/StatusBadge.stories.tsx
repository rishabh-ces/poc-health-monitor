import type { Meta, StoryObj } from '@storybook/nextjs'
import StatusBadge from '../StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'error', 'maintenance'],
      description:
        'The status of the device, which determines the badge color and text.',
    },
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>

/**
 * A showcase of all available status badges for quick visual comparison.
 */
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      <StatusBadge status="online" />
      <StatusBadge status="offline" />
      <StatusBadge status="error" />
      <StatusBadge status="maintenance" />
    </div>
  ),
}

/**
 * The 'Online' state, indicating an active or connected status.
 */
export const Online: Story = {
  args: {
    status: 'online',
  },
}

/**
 * The 'Offline' state, indicating an inactive or disconnected status.
 */
export const Offline: Story = {
  args: {
    status: 'offline',
  },
}

/**
 * The 'Error' state, indicating a problem or failure.
 */
export const Error: Story = {
  args: {
    status: 'error',
  },
}

/**
 * The 'Maintenance' state, for devices undergoing service.
 */
export const Maintenance: Story = {
  args: {
    status: 'maintenance',
  },
}
