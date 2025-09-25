import { DeviceCardSkeleton } from '@/components/DeviceCardSkeleton'

export function DeviceGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <DeviceCardSkeleton key={i} />
      ))}
    </div>
  )
}
