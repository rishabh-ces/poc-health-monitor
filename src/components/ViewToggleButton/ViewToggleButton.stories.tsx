import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import ViewToggleButton from '../ViewToggleButton'

const meta: Meta<typeof ViewToggleButton> = {
  title: 'Components/ViewToggleButton',
  component: ViewToggleButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentView: {
      control: 'select',
      options: ['cards', 'table'],
      description: 'The currently active view.',
    },
    // This allows Storybook to log when the onViewChange function is called
    onViewChange: { action: 'onViewChange' },
  },
}

export default meta
type Story = StoryObj<typeof ViewToggleButton>

/**
 * An interactive story that manages its own state, allowing you to click
 * the buttons and see the visual state change in real-time.
 */
export const Interactive: Story = {
  render: (args) => {
    // Use React's useState to manage the state for this story
    const [view, setView] = useState(args.currentView || 'cards')

    return (
      <ViewToggleButton
        {...args}
        currentView={view}
        onViewChange={(newView) => {
          // Call the Storybook action so it's logged
          args.onViewChange(newView)
          // Update the local state to change the visual appearance
          setView(newView)
        }}
      />
    )
  },
  args: {
    currentView: 'cards',
  },
}

/**
 * A static story showing the 'Cards' view as active.
 */
export const CardsActive: Story = {
  args: {
    currentView: 'cards',
  },
}

/**
 * A static story showing the 'Table' view as active.
 */
export const TableActive: Story = {
  args: {
    currentView: 'table',
  },
}
