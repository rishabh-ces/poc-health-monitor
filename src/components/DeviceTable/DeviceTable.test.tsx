import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import DeviceTable from '../DeviceTable' // Corrected import path
import { hasAlert } from '@/lib/utils'
import type { Device } from '@/lib/types'

// --- Mock Dependencies ---
jest.mock('@/lib/utils', () => ({
  ...(jest.requireActual('@/lib/utils') as object),
  hasAlert: jest.fn(),
}))

const Comp = ({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) => <a href={href}>{children}</a>

jest.mock('next/link', () => Comp)
jest.mock('../StatusBadge', () => ({
  __esModule: true,
  default: () => <span>Status Badge</span>,
}))
jest.mock('lucide-react', () => ({
  TriangleAlert: () => <span>Alert Icon</span>,
}))

const mockedHasAlert = hasAlert as jest.Mock

const mockDevices: Device[] = [
  {
    id: 'dev-1',
    name: 'Device One',
    status: 'online',
    location: 'Loc A',
    lastUpdated: new Date().toISOString(),
    battery: 90,
    temperature: 20,
    signalStrength: 'poor',
  },
  {
    id: 'dev-2',
    name: 'Device Two',
    status: 'error',
    location: 'Loc B',
    lastUpdated: new Date().toISOString(),
    battery: 10,
    temperature: 50,
    signalStrength: 'excellent',
  },
]

describe('DeviceTable Component', () => {
  beforeEach(() => {
    mockedHasAlert.mockClear()
  })

  it('should render a "No devices found" message when the devices array is empty', () => {
    render(<DeviceTable devices={[]} />)
    expect(screen.getByText('No devices found.')).toBeInTheDocument()
    // Check that no device-specific rows are rendered
    expect(screen.queryByText('Device One')).not.toBeInTheDocument()
  })

  it('should render a row for each device provided', () => {
    render(<DeviceTable devices={mockDevices} />)
    // Find all elements with the 'row' role. This includes the header.
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(mockDevices.length + 1) // +1 for the header row
  })

  it('should display an alert icon for a device when hasAlert returns true', () => {
    mockedHasAlert.mockImplementation((device: Device) => device.id === 'dev-2')
    render(<DeviceTable devices={mockDevices} />)

    // Find the cell containing the unique text, then find its parent row
    const cell = screen.getByText('Device Two')
    const deviceTwoRow = cell.closest('tr')! // Use ! to assert it's not null

    // Assert that the alert icon exists WITHIN that specific row
    expect(within(deviceTwoRow).getByText('Alert Icon')).toBeInTheDocument()

    // Also check that the icon is NOT in the other row
    const otherCell = screen.getByText('Device One')
    const deviceOneRow = otherCell.closest('tr')!
    expect(
      within(deviceOneRow).queryByText('Alert Icon'),
    ).not.toBeInTheDocument()
  })
})
