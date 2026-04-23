import { useCallback, useEffect, useMemo, useState } from 'react'
import { useProject } from '@/context/ProjectContext'
import type { PanePageId } from '@/lib/pane-pages'
import {
  getVisiblePaneIdsForPage,
  setVisiblePaneOrder,
  showAllPanesOnPage,
  subscribePaneLayout,
} from '@/lib/paneLayoutStorage'

/**
 * Which design-kit columns are on for a lab page (ordered), persisted per project + page. The main grid
 * renders every visible kit (`displayIds` shares the same order as `visibleIds`); when the row is wider
 * than the viewport, `PaneKitGrid` scrolls horizontally.
 * We subscribe with state + `useMemo` (not `useSyncExternalStore`) because `getVisiblePaneIdsForPage` returns
 * a fresh array each call — a snapshot that changes referentially every read triggers infinite re-renders
 * in `useSyncExternalStore` and can blank the page.
 */
export function usePaneLayout(pageId: PanePageId) {
  const { projectSlug, kits } = useProject()
  const catalogIds = useMemo(() => kits.map((k) => k.id), [kits])
  const [bump, setBump] = useState(0)

  useEffect(() => subscribePaneLayout(() => setBump((n) => n + 1)), [])

  // `bump` re-reads when pane layout is saved (same tab) or storage syncs; not derivable from other deps
  const visibleIds = useMemo(
    () => getVisiblePaneIdsForPage(projectSlug, pageId, catalogIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bump invalidates external localStorage
    [projectSlug, pageId, catalogIds, bump],
  )

  const setVisible = useCallback(
    (ids: string[]) => {
      setVisiblePaneOrder(projectSlug, pageId, ids)
    },
    [projectSlug, pageId],
  )

  const showAll = useCallback(() => {
    showAllPanesOnPage(projectSlug, pageId)
  }, [projectSlug, pageId])

  const toggle = useCallback(
    (id: string) => {
      const cur = getVisiblePaneIdsForPage(projectSlug, pageId, catalogIds)
      if (cur.includes(id)) {
        setVisiblePaneOrder(
          projectSlug,
          pageId,
          cur.filter((x) => x !== id),
        )
        return
      }
      setVisiblePaneOrder(projectSlug, pageId, [...cur, id])
    },
    [projectSlug, pageId, catalogIds],
  )

  return {
    visibleIds,
    displayIds: visibleIds,
    setVisible,
    showAll,
    toggle,
  }
}
