import { getDevices } from '@/lib/data'
import DeviceCard from '@/components/DeviceCard/DeviceCard'

export async function DeviceGrid() {
  const devices = getDevices()

  // artificial delay to see the skeleton in development
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  )
}
