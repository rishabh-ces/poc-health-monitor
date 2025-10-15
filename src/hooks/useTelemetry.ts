import { useState, useEffect, useCallback } from 'react'
import { fetchDeviceTelemetry } from '@/services/deviceAPI'
import { DATA_FETCH_INTERVAL } from '@/lib/constants'
import type { DeviceTelemetry } from '@/lib/types'

const useTelemetry = (deviceId: string) => {
  const [telemetry, setTelemetry] = useState<DeviceTelemetry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // This is now the single source of truth for fetching data.
  // It's wrapped in useCallback so it's stable between renders.
  const getTelemetry = useCallback(async () => {
    // Only set an error if the request fails. Don't clear existing data on a poll failure.
    setError(null)
    try {
      const data = await fetchDeviceTelemetry(deviceId)
      setTelemetry(data)
    } catch (err) {
      console.error(`Telemetry poll failed for ${deviceId}:`, err)
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred'),
      )
    }
  }, [deviceId])

  // Handles only the initial data load and manages the skeleton UI.
  useEffect(() => {
    let isMounted = true

    const initialFetch = async () => {
      setIsLoading(true)
      await getTelemetry() // Call the main fetch function
      if (isMounted) {
        setIsLoading(false)
      }
    }

    initialFetch()

    return () => {
      isMounted = false
    }
  }, [getTelemetry]) // Re-runs if deviceId changes (because getTelemetry changes)

  // Handles the background polling interval.
  useEffect(() => {
    const intervalId = setInterval(getTelemetry, DATA_FETCH_INTERVAL)

    return () => clearInterval(intervalId)
  }, [getTelemetry])

  return { telemetry, isLoading, error, refetch: getTelemetry }
}

export default useTelemetry
