import { useCallback, useMemo, useState, type DragEvent } from 'react'
import { useKits, useProject } from '@/context/ProjectContext'
import { usePaneLayout } from '@/hooks/usePaneLayout'
import { MAX_PANES_IN_GRID } from '@/lib/paneConstants'
import type { PanePageId } from '@/lib/pane-pages'

const PANE_DND_MIME = 'application/x-ui-lab-pane-id'

function reorderIds(ids: string[], from: number, to: number): string[] {
  if (from === to || from < 0 || to < 0 || from >= ids.length || to >= ids.length) return ids
  const next = [...ids]
  const [item] = next.splice(from, 1)
  if (item === undefined) return ids
  next.splice(to, 0, item)
  return next
}

type Props = {
  pageId: PanePageId
  pageLabel: string
}

/**
 * On/off chips in one strip; “on” order is changed by dragging the grip left/right (no arrow buttons).
 */
export function KitPaneBar({ pageId, pageLabel }: Props) {
  const { visibleIds, toggle, showAll, setVisible } = usePaneLayout(pageId)
  const { project } = useProject()
  const kits = useKits()
  const kitName = (id: string) => kits.find((k) => k.id === id)?.name ?? id
  const allIds = useMemo(() => kits.map((k) => k.id), [kits])
  const offIds = useMemo(() => allIds.filter((id) => !visibleIds.includes(id)), [allIds, visibleIds])
  const projectBit = project?.name ? `${project.name} · ` : ''
  const label = `${projectBit}Panes on this page — ${pageLabel}`
  const canReorder = visibleIds.length > 1

  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const endDrag = useCallback(() => {
    setDraggingId(null)
    setDragOverIndex(null)
  }, [])

  const onHandleDragStart = useCallback(
    (id: string) => (e: DragEvent) => {
      e.dataTransfer.setData(PANE_DND_MIME, id)
      e.dataTransfer.setData('text/plain', id)
      e.dataTransfer.effectAllowed = 'move'
      setDraggingId(id)
    },
    [],
  )

  const onCellDragOver = useCallback(
    (index: number) => (e: DragEvent) => {
      if (!canReorder) return
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      setDragOverIndex(index)
    },
    [canReorder],
  )

  const onCellDrop = useCallback(
    (dropIndex: number) => (e: DragEvent) => {
      e.preventDefault()
      const raw = e.dataTransfer.getData(PANE_DND_MIME) || e.dataTransfer.getData('text/plain')
      endDrag()
      if (!raw) return
      const fromIndex = visibleIds.indexOf(raw)
      if (fromIndex < 0) return
      setVisible(reorderIds(visibleIds, fromIndex, dropIndex))
    },
    [endDrag, setVisible, visibleIds],
  )

  const onStripDragLeave = useCallback((e: DragEvent) => {
    const next = e.relatedTarget
    if (next instanceof Node && e.currentTarget.contains(next)) return
    setDragOverIndex(null)
  }, [])

  return (
    <div
      className="pane-chooser"
      role="group"
      aria-label={label}
      onDragEnd={endDrag}
    >
      <p className="pane-chooser__eyebrow">Panes</p>
      {allIds.length === 0 ? (
        <p className="pane-chooser__hint" role="status">
          This project has no design kits in the catalog yet, so there is nothing to add or remove. Add kits in the
          project <code>getKitsFor*Project</code> resolver in code, then a chip will show per kit.
        </p>
      ) : (
        <p className="pane-chooser__hint">
          <strong>On</strong> (left to right) = column order in the comparison row. More than {MAX_PANES_IN_GRID}{' '}
          kits scroll horizontally. <strong>Drag the grip</strong> on an on-kit to slide it along the row.{' '}
          <strong>Off</strong> = out of the comparison (click chip to toggle). Fewer columns leave empty space on the
          right until you add more.
        </p>
      )}

      {allIds.length > 0 ? (
        <div
          className="pane-chooser__strip"
          role="group"
          aria-label={`Kits on (${visibleIds.length}) then off (${offIds.length}) for ${pageLabel}`}
          onDragLeave={onStripDragLeave}
        >
          {visibleIds.length > 0 ? (
            <>
              <span className="pane-chooser__strip-label">On</span>
              {visibleIds.map((id, index) => {
                const name = kitName(id)
                const offHint = `Column ${index + 1} in the comparison row.`
                const a11y = `Turn off ${name}. ${offHint}`
                const isDragging = draggingId === id
                const isOver = dragOverIndex === index && draggingId !== null && draggingId !== id
                return (
                  <div
                    key={id}
                    className={[
                      'pane-chooser__cell',
                      isDragging ? 'pane-chooser__cell--dragging' : '',
                      isOver ? 'pane-chooser__cell--drop-target' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onDragOver={onCellDragOver(index)}
                    onDrop={onCellDrop(index)}
                  >
                    {canReorder ? (
                      <span
                        className="pane-chooser__handle"
                        draggable
                        onDragStart={onHandleDragStart(id)}
                        aria-label={`Drag to reorder ${name}`}
                        title="Drag to reorder along the row"
                      >
                        <span className="pane-chooser__handle-dots" aria-hidden>
                          ⋮⋮
                        </span>
                      </span>
                    ) : null}
                    <button
                      type="button"
                      className="pane-chooser__chip pane-chooser__chip--on pane-chooser__chip--in-grid"
                      aria-pressed={true}
                      onClick={() => toggle(id)}
                      title={a11y}
                    >
                      <span className="pane-chooser__chip-on" aria-hidden>
                        ✓
                      </span>
                      <span className="pane-chooser__chip-text">
                        <span className="pane-chooser__chip-slot" aria-hidden>
                          {index + 1}
                        </span>
                        {name}
                      </span>
                    </button>
                  </div>
                )
              })}
            </>
          ) : null}

          {offIds.length > 0 && visibleIds.length > 0 ? <span className="pane-chooser__strip-divider" aria-hidden /> : null}
          {offIds.length > 0 ? (
            <>
              <span className="pane-chooser__strip-label">Off</span>
              {offIds.map((id) => {
                const name = kitName(id)
                return (
                  <div key={id} className="pane-chooser__cell pane-chooser__cell--off">
                    <button
                      type="button"
                      className="pane-chooser__chip pane-chooser__chip--off"
                      aria-pressed={false}
                      onClick={() => toggle(id)}
                      title={`Add ${name} to the comparison.`}
                    >
                      <span className="pane-chooser__chip-on" aria-hidden>
                        ○
                      </span>
                      <span className="pane-chooser__chip-text">{name}</span>
                    </button>
                  </div>
                )
              })}
            </>
          ) : null}

          {visibleIds.length < allIds.length ? (
            <button type="button" className="pane-chooser__link pane-chooser__link--strip" onClick={showAll}>
              Show all
            </button>
          ) : null}
        </div>
      ) : null}

    </div>
  )
}
