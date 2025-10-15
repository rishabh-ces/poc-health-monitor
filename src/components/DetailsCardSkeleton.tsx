import React from 'react'

export default function DetailsCardSkeleton() {
  const shimmer = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md'
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <div className={`h-5 w-40 ${shimmer}`} />
          <div className={`h-3 w-24 ${shimmer}`} />
          <div className={`h-3 w-32 ${shimmer}`} />
        </div>
        <div className={`h-6 w-16 ${shimmer}`} />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-3 w-full ${shimmer}`} />
        ))}
      </div>
    </div>
  )
}
