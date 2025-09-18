import type { Meta, StoryObj } from '@storybook/react'
import StatusBadge from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A visual indicator badge to display the status of a device, such as "online", "offline", or "error".',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'error'],
      description: 'The visual status of the badge.',
      table: {
        defaultValue: { summary: 'online' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>

/**
 * The default 'Online' state of the badge, indicating an active or connected status.
 */
export const Online: Story = {
  args: {
    status: 'online',
  },
}

/**
 * The 'Offline' state of the badge, indicating an inactive or disconnected status.
 */
export const Offline: Story = {
  args: {
    status: 'offline',
  },
}

/**
 * The 'Error' state of the badge, indicating a problem or failure.
 */
export const Error: Story = {
  args: {
    status: 'error',
  },
}
