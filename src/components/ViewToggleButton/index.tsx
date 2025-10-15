'use client'

import { LayoutGrid, List } from 'lucide-react'

type View = 'cards' | 'table'

interface ViewToggleButtonProps {
  currentView: View
  onViewChange: (view: View) => void
}

export default function ViewToggleButton({
  currentView,
  onViewChange,
}: ViewToggleButtonProps) {
  const baseClasses =
    'px-3 py-1.5 text-sm font-medium flex items-center gap-2 transition-colors duration-200'
  const activeClasses = 'bg-blue-600 text-white rounded-md shadow-sm'
  const inactiveClasses =
    'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 rounded-md'

  return (
    <div
      role="group"
      aria-label="View toggle"
      className="flex items-center space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800"
    >
      <button
        onClick={() => onViewChange('cards')}
        aria-pressed={currentView === 'cards'}
        className={`${baseClasses} ${
          currentView === 'cards' ? activeClasses : inactiveClasses
        }`}
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => onViewChange('table')}
        aria-pressed={currentView === 'table'}
        className={`${baseClasses} ${
          currentView === 'table' ? activeClasses : inactiveClasses
        }`}
      >
        <List size={16} />
      </button>
    </div>
  )
}
