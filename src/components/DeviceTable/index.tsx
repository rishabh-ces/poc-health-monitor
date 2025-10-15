import Link from 'next/link'
import type { Device } from '@/lib/types'
import StatusBadge from '../StatusBadge'
import { hasAlert } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'

export default function DeviceTable({ devices }: { devices: Device[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
            >
              Location
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
            >
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {devices.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                No devices found.
              </td>
            </tr>
          ) : (
            devices.map((device) => (
              <tr
                key={device.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/devices/${device.id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {device.name}{' '}
                    {hasAlert(device) && (
                      <TriangleAlert size={12} className="inline" color="red" />
                    )}
                  </Link>
                  <div className="font-mono text-xs text-gray-500">
                    {device.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={device.status} />
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {device.location}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {new Date(device.lastUpdated).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
