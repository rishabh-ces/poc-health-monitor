import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DeviceCard from '../DeviceCard'
import { hasAlert } from '@/lib/utils'
import type { Device } from '@/lib/types'

// 1. Mock all dependencies to test this component in isolation

// Mock the hasAlert utility function
jest.mock('@/lib/utils', () => ({
  hasAlert: jest.fn(),
}))

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  MapPin: () => <span>MapPin Icon</span>,
  Clock: () => <span>Clock Icon</span>,
}))

// Mock the StatusBadge child component
jest.mock('../StatusBadge', () => ({
  __esModule: true,
  default: ({ status }: { status: string }) => <div>Status: {status}</div>,
}))

// --- Test Setup ---

// Create a typed mock for hasAlert to control its return value
const mockedHasAlert = hasAlert as jest.Mock

const mockDevice: Device = {
  id: 'factory-001',
  name: 'Factory Sensor A',
  location: 'Assembly Line 1',
  status: 'online',
  battery: 85,
  temperature: 25,
  signalStrength: 'good',
  lastUpdated: new Date().toISOString(),
}

describe('DeviceCard Component', () => {
  // Clear mocks before each test to ensure isolation
  beforeEach(() => {
    mockedHasAlert.mockClear()
  })

  it('should render correctly in a normal state (no alert)', () => {
    // Arrange: Tell the mock to return `false` for this test
    mockedHasAlert.mockReturnValue(false)

    // Act
    const { container } = render(<DeviceCard device={mockDevice} />)

    // Assert: Check that all information is rendered
    expect(screen.getByText('Factory Sensor A')).toBeInTheDocument()
    expect(screen.getByText('factory-001')).toBeInTheDocument()
    expect(screen.getByText('Status: online')).toBeInTheDocument()
    expect(screen.getByText(/Assembly Line 1/)).toBeInTheDocument()

    // Assert: Check that alert styles are NOT applied
    const cardElement = container.firstChild
    const titleElement = screen.getByLabelText('device name')

    expect(cardElement).not.toHaveClass('ring-3')
    expect(titleElement).not.toHaveClass('text-red-600')
  })

  it('does not apply alert styles when hasAlert returns false', () => {
    // Arrange: mock hasAlert to return false
    mockedHasAlert.mockReturnValue(false)

    // Act
    const { container } = render(<DeviceCard device={mockDevice} />)

    // Assert: card does not have the alert ring
    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).not.toHaveClass('ring-3')
    expect(cardElement.className).not.toMatch(/ring-red-500\/20/)
  })
})
