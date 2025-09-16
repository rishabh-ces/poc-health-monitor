export const fetchTelemetry = async (deviceId: string) => {
  try {
    const res = await fetch(`/api/devices/${deviceId}/telemetry`)
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Telemetry fetch failed:', err)
  }
}
