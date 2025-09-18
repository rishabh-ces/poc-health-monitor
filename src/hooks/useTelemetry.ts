import { useState, useEffect } from 'react'
import { fetchTelemetry } from '@/services/deviceAPI'
import type { DeviceTelemetry } from '@/lib/types'
import { DATA_FETCH_INTERVAL } from '@/lib/constants'

const useTelemetry = (deviceId: string) => {
  const [telemetry, setTelemetry] = useState<DeviceTelemetry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let ignore = false

    const getTelemetry = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchTelemetry(deviceId)
        if (!ignore) {
          setTelemetry(data)
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err : new Error('An unknown error occurred'),
          )
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    getTelemetry()
    const intervalId = setInterval(getTelemetry, DATA_FETCH_INTERVAL)

    return () => {
      ignore = true
      clearInterval(intervalId)
    }
  }, [deviceId])

  return { telemetry, isLoading, error }
}

export default useTelemetry
