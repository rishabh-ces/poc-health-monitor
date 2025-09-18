import { render, screen } from '@testing-library/react'
import StatusBadge from './StatusBadge'

describe('StatusBadge', () => {
  it('renders the "online" status correctly', () => {
    render(<StatusBadge status="online" />)
    const badgeElement = screen.getByText('online')
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-green-100')
  })

  it('renders the "offline" status correctly', () => {
    render(<StatusBadge status="offline" />)
    const badgeElement = screen.getByText('offline')
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-gray-100')
  })

  it('renders the "error" status correctly', () => {
    render(<StatusBadge status="error" />)
    const badgeElement = screen.getByText('error')
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-red-100')
  })
})
