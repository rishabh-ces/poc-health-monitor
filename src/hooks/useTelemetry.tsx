'use client'

import { useState, useEffect } from 'react'
import type { DeviceTelemetry } from '@/lib/types'

const useTelemetry = (deviceId: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [telemetry, setTelemetry] = useState<DeviceTelemetry | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchTelemetry = async () => {
      try {
        const res = await fetch(`/api/devices/${deviceId}/telemetry`)
        const data = await res.json()
        if (isMounted) {
          setTelemetry(data)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Telemetry fetch failed:', err)
      }
    }

    fetchTelemetry()
    const interval = setInterval(fetchTelemetry, 10000) // every 10s

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [deviceId])

  return { isLoading, telemetry }
}

export default useTelemetry
