import { useKits, useProject } from '@/context/ProjectContext'
import { usePaneLayout } from '@/hooks/usePaneLayout'
import type { PanePageId } from '@/lib/pane-pages'

type Props = {
  pageId: PanePageId
  /** e.g. "Kits" for aria */
  pageLabel: string
}

/**
 * Toggles which designKit columns (panes) appear on a page. Persists per route.
 */
export function KitPaneBar({ pageId, pageLabel }: Props) {
  const { visibleIds, toggle, showAll } = usePaneLayout(pageId)
  const { project } = useProject()
  const kits = useKits()
  const allIds = kits.map((k) => k.id)
  const projectBit = project?.name ? `${project.name} · ` : ''
  const label = `${projectBit}Panes on this page — ${pageLabel}`

  return (
    <div
      className="pane-chooser"
      role="group"
      aria-label={label}
    >
      <p className="pane-chooser__eyebrow">Panes</p>
      <div className="pane-chooser__row">
        {allIds.map((id) => {
          const on = visibleIds.includes(id)
          const name = kits.find((k) => k.id === id)?.name ?? id
          return (
            <button
              key={id}
              type="button"
              className={['pane-chooser__chip', on ? 'pane-chooser__chip--on' : 'pane-chooser__chip--off']
                .filter(Boolean)
                .join(' ')}
              aria-pressed={on}
              onClick={() => toggle(id)}
            >
              <span className="pane-chooser__chip-on">{on ? '✓' : '○'}</span>
              {name}
            </button>
          )
        })}
        {visibleIds.length < allIds.length ? (
          <button type="button" className="pane-chooser__link" onClick={showAll}>
            Show all
          </button>
        ) : null}
      </div>
    </div>
  )
}
