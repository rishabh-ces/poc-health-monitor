'use client'

import { MapPin, Clock, TriangleAlert } from 'lucide-react'
import type { Device } from '@/lib/types'
import StatusBadge from '../StatusBadge'
import { hasAlert } from '@/lib/utils'

export default function DeviceCard({ device }: { device: Device }) {
  return (
    <div
      className={`group rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 ${
        hasAlert(device)
          ? 'border-red-500/50 ring-3 ring-red-500/20'
          : 'border-gray-200 dark:border-gray-800'
      } `}
      role="group"
    >
      <div className="flex items-start justify-between">
        <h2
          className="text-base font-bold text-gray-800 dark:text-gray-100"
          aria-label="device name"
        >
          {device.name}{' '}
          {hasAlert(device) && (
            <TriangleAlert size={12} className="inline" color="red" />
          )}
        </h2>
        <StatusBadge status={device.status} />
      </div>
      <p
        className="mb-2 font-mono text-xs text-gray-500 dark:text-gray-400"
        aria-label="device id"
      >
        {device.id}
      </p>
      <p
        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
        aria-label="device location"
      >
        <MapPin size={12} /> &nbsp;{device.location}
      </p>
      <p
        className="mt-1 flex items-center text-xs text-gray-400 dark:text-gray-500"
        aria-label="last updated"
      >
        <Clock size={12} /> &nbsp;
        {new Date(device.lastUpdated).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </p>
    </div>
  )
}
