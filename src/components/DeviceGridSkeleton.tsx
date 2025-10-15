'use client'

import React from 'react'

// Simple shimmer animation using Tailwind
const shimmer = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md'

export default function DeviceGridSkeleton({ count = 16 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/50"
        >
          {/* Header: name + status badge */}
          <div className="mb-2 flex items-start justify-between">
            <div className={`h-4 w-2/3 ${shimmer}`} />
            <div className={`h-3 w-10 ${shimmer}`} />
          </div>

          {/* Device ID */}
          <div className={`mb-4 h-3 w-1/2 ${shimmer}`} />

          {/* Location */}
          <div className="mb-2 flex items-center gap-2">
            <div className={`h-3 w-3 ${shimmer} rounded-full`} />
            <div className={`h-3 w-2/3 ${shimmer}`} />
          </div>

          {/* Last Updated */}
          <div className={`h-2.5 w-1/3 ${shimmer}`} />
        </div>
      ))}
    </div>
  )
}
