type Status = 'online' | 'offline' | 'error'

const baseClasses = 'px-2 py-0.5 text-xs font-semibold rounded-full capitalize'

const statusClasses: Record<Status, string> = {
  online: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  offline: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
  error: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const StatusBadge = ({ status }: { status: Status }) => (
  <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
)

export default StatusBadge
