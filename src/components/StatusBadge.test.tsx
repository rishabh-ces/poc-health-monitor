import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders the "Online" status correctly', () => {
    render(<StatusBadge status="online" />)
    const badgeElement = screen.getByText('Online')
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-green-100')
  })

  it('renders the "Offline" status correctly', () => {
    render(<StatusBadge status="offline" />)
    const badgeElement = screen.getByText('Offline')
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-gray-100')
  })

  it('renders the "Error" status correctly', () => {
    render(<StatusBadge status="error" />)
    const badgeElement = screen.getByText('Error')
    expect(badgeElement).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-red-100')
  })
})