// src/hooks/useTelemetry.ts

import { useState, useEffect } from 'react'
import { fetchTelemetry } from '@/services/deviceAPI'
import type { DeviceTelemetry } from '@/lib/types'

const useTelemetry = (deviceId: string) => {
  const [telemetry, setTelemetry] = useState<DeviceTelemetry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const getTelemetry = async () => {
      try {
        const data = await fetchTelemetry(deviceId)
        if (isMounted) {
          setTelemetry(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error('An unknown error occurred'),
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    getTelemetry()

    return () => {
      isMounted = false
    }
  }, [deviceId])

  return { telemetry, isLoading, error }
}

export default useTelemetry
