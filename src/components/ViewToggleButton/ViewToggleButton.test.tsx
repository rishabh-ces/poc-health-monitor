import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ViewToggleButton from '../ViewToggleButton'

// Mock the lucide-react icons to make them easier to find in tests
jest.mock('lucide-react', () => ({
  LayoutGrid: () => 'Cards', // Render simple text instead of an SVG
  List: () => 'Table',
}))

describe('ViewToggleButton Component', () => {
  it('should render both buttons with the correct accessible names', () => {
    render(<ViewToggleButton currentView="cards" onViewChange={jest.fn()} />)
    expect(screen.getByRole('button', { name: /cards/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /table/i })).toBeInTheDocument()
  })

  it('should correctly apply aria-pressed when "cards" view is active', () => {
    render(<ViewToggleButton currentView="cards" onViewChange={jest.fn()} />)
    expect(screen.getByRole('button', { name: /cards/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: /table/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('should correctly apply aria-pressed when "table" view is active', () => {
    render(<ViewToggleButton currentView="table" onViewChange={jest.fn()} />)
    expect(screen.getByRole('button', { name: /cards/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.getByRole('button', { name: /table/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('should call onViewChange with "table" when the table button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnViewChange = jest.fn() // Create a mock function
    render(
      <ViewToggleButton currentView="cards" onViewChange={mockOnViewChange} />,
    )

    const tableButton = screen.getByRole('button', { name: /table/i })
    await user.click(tableButton)

    expect(mockOnViewChange).toHaveBeenCalledTimes(1)
    expect(mockOnViewChange).toHaveBeenCalledWith('table')
  })

  it('should not call onViewChange if the active button is clicked again', async () => {
    const user = userEvent.setup()
    const mockOnViewChange = jest.fn()
    render(
      <ViewToggleButton currentView="cards" onViewChange={mockOnViewChange} />,
    )

    // Click the already active button
    const cardsButton = screen.getByRole('button', { name: /cards/i })
    await user.click(cardsButton)

    // The handler should still only be called once with 'cards'
    expect(mockOnViewChange).toHaveBeenCalledTimes(1)
    expect(mockOnViewChange).toHaveBeenCalledWith('cards')
  })
})
