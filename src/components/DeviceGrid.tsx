'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Device, Status } from '@/lib/types'
import { DATA_FETCH_INTERVAL } from '@/lib/constants'
import DeviceCard from '@/components/DeviceCard'
import { fetchAllDevices } from '@/services/deviceAPI'
import ViewToggleButton from './ViewToggleButton'
import DeviceTable from './DeviceTable'

type View = 'cards' | 'table'

// This component now fetches data for all its children
export default function DeviceGrid({
  initialDevices,
}: {
  initialDevices: Device[]
}) {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('online')
  const [view, setView] = useState<View>('cards')

  useEffect(() => {
    const refreshDeviceList = async () => {
      try {
        // Fetch the new list with potentially updated statuses
        const updatedDevices = await fetchAllDevices()
        setDevices(updatedDevices)
      } catch (error) {
        console.error('Failed to refresh device list:', error)
      }
    }

    // Single interval to refresh all data
    const intervalId = setInterval(refreshDeviceList, DATA_FETCH_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  const filteredDevices = useMemo(() => {
    if (statusFilter === 'all') return devices
    return devices.filter((device) => device.status === statusFilter)
  }, [devices, statusFilter])

  return filteredDevices.length > 0 ? (
    <>
      <div className="mb-6 flex items-center justify-end gap-2">
        <label
          htmlFor="status-filter"
          className="text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          Filter (by status): &nbsp;
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as Status | 'all')
            }
            className="rounded-md border-gray-300 bg-white py-2 pr-8 pl-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="error">Error</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>

        <ViewToggleButton currentView={view} onViewChange={setView} />
      </div>
      {view === 'cards' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDevices
            .sort((a: Device, b: Device) => a.name.localeCompare(b.name))
            .map((device) => (
              <Link key={device.id} href={`/devices/${device.id}`}>
                <DeviceCard
                  data-testid={`device-card-${device.id}`}
                  device={device}
                />
              </Link>
            ))}
        </div>
      ) : (
        <DeviceTable devices={filteredDevices} />
      )}
    </>
  ) : (
    <div className="flex w-auto items-center justify-center rounded-lg bg-gray-50 py-20 dark:bg-gray-800">
      <p className="text-center text-lg font-medium text-gray-400 dark:text-gray-300">
        No Devices Available
      </p>
    </div>
  )
}
