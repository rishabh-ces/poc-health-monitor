import type { Device } from '@/lib/types'

const statusStyles = {
  online: {
    dot: 'bg-green-500',
    text: 'text-green-700 dark:text-green-400',
    background: 'bg-green-50 dark:bg-green-500/10',
  },
  offline: {
    dot: 'bg-gray-400',
    text: 'text-gray-600 dark:text-gray-400',
    background: 'bg-gray-100 dark:bg-gray-500/10',
  },
  error: {
    dot: 'bg-red-500',
    text: 'text-red-700 dark:text-red-400',
    background: 'bg-red-50 dark:bg-red-500/10',
  },
}

export function StatusBadge({ status }: { status: Device['status'] }) {
  const styles = statusStyles[status]

  return (
    <div
      className={`inline-flex items-center gap-x-2 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.background} ${styles.text} `}
    >
      <div className={`h-2 w-2 rounded-full ${styles.dot}`}></div>
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
  )
}
