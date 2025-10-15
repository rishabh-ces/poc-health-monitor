import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // For extra matchers like .toHaveClass()
import StatusBadge from '../StatusBadge'
import { Status } from '@/lib/types'

describe('StatusBadge Component', () => {
  // An array of test cases to test each status variant
  const testCases: { status: Status; expectedClass: string }[] = [
    { status: 'online', expectedClass: 'bg-green-100' },
    { status: 'offline', expectedClass: 'bg-gray-100' },
    { status: 'error', expectedClass: 'bg-red-100' },
    { status: 'maintenance', expectedClass: 'bg-yellow-100' },
  ]

  // Use it.each to run the same test logic for each case in the array
  it.each(testCases)(
    'should render with the correct text and styles for status "$status"',
    ({ status, expectedClass }) => {
      // 1. Arrange: Render the component with the current status from the loop
      render(<StatusBadge status={status} />)

      // 2. Act: Find the element by its text content
      const badgeElement = screen.getByText(status)

      // 3. Assert: Check that the element exists and has the correct classes
      expect(badgeElement).toBeInTheDocument()
      expect(badgeElement).toHaveClass(expectedClass) // Check for the status-specific class
      expect(badgeElement).toHaveClass('capitalize') // Check for a base class
    },
  )
})
