import { renderHook, act, waitFor } from '@testing-library/react'
import useTelemetry from './useTelemetry'
import { fetchTelemetry } from '@/services/deviceAPI'
import { DeviceTelemetry } from '@/lib/types'

// Mock the entire deviceAPI service
jest.mock('@/services/deviceAPI')

// Create a typed mock for our fetch function
const mockedFetchTelemetry = fetchTelemetry as jest.Mock

describe('useTelemetry Hook', () => {
  // Clear any previous mock implementations before each test
  beforeEach(() => {
    mockedFetchTelemetry.mockClear()
  })

  it('should be in a loading state initially', () => {
    // Arrange: Mock a pending promise
    mockedFetchTelemetry.mockReturnValue(new Promise(() => {}))

    // Act: Render the hook
    const { result } = renderHook(() => useTelemetry('device-001'))

    // Assert: Check initial state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.telemetry).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('should return telemetry data on successful fetch', async () => {
    // Arrange: Mock a successful response
    const mockData: DeviceTelemetry = {
      deviceId: 'device-001',
      timestamp: new Date().toISOString(),
      battery: 85,
      temperature: 25,
      connectivity: 'excellent',
    }
    mockedFetchTelemetry.mockResolvedValue(mockData)

    // Act: Render the hook
    const { result } = renderHook(() => useTelemetry('device-001'))

    // Assert: Wait for the state to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.telemetry).toEqual(mockData)
    expect(result.current.error).toBeNull()
  })

  it('should return an error on a failed fetch', async () => {
    // Arrange: Mock a failed response
    const mockError = new Error('Network Error')
    mockedFetchTelemetry.mockRejectedValue(mockError)

    // Act: Render the hook
    const { result } = renderHook(() => useTelemetry('device-001'))

    // Assert: Wait for the error state to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toEqual(mockError)
    expect(result.current.telemetry).toBeNull()
  })
})
