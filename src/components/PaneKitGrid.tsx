import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { MAX_PANES_IN_GRID } from '@/lib/paneConstants'

type Props = {
  /** How many kit columns are visible. Fixed-width tracks; more than four columns scroll horizontally. */
  columnCount: number
  children: ReactNode
}

/**
 * Comparison grid for kit panes: fixed-width tracks so turning kits off leaves empty space to the right
 * instead of stretching the remaining columns across the viewport. When there are more than four columns,
 * the row grows wider than the page and the outer wrap scrolls horizontally.
 */
export function PaneKitGrid({ columnCount, children }: Props) {
  const n = Math.max(0, columnCount)
  if (n <= 0) return null
  const wideRow = n > MAX_PANES_IN_GRID
  return (
    <div className={cn('app-grid-wrap', wideRow && 'app-grid-wrap--pane-scroll-many')}>
      <div
        className="app-grid app-grid--pane-kit-columns"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(260px, 360px))` }}
      >
        {children}
      </div>
    </div>
  )
}
