import type { PanePageId } from './pane-pages'

const STORAGE_KEY = 'ui-lab-pane-layout'
const EVENT = 'ui-lab-pane-layout-change'

type Stored = Record<string, string[] | undefined>

function read(): Record<string, string[] | undefined> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const p = JSON.parse(raw) as unknown
    if (!p || typeof p !== 'object') return {}
    const out: Stored = {}
    for (const [k, v] of Object.entries(p as Record<string, unknown>)) {
      if (v === undefined) {
        out[k] = undefined
        continue
      }
      if (!Array.isArray(v)) continue
      out[k] = v.filter((id): id is string => typeof id === 'string')
    }
    const pages = ['kits', 'analyze', 'live'] as const
    let migrated = false
    for (const page of pages) {
      const flat = String(page)
      const scoped = `isocourt::${page}`
      if (Object.prototype.hasOwnProperty.call(out, flat)) {
        if (out[scoped] == null && out[flat] != null) {
          out[scoped] = out[flat]
        }
        if (flat !== scoped) {
          delete out[flat]
          migrated = true
        }
      }
    }
    if (migrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(out))
        window.dispatchEvent(new CustomEvent(EVENT))
      } catch {
        /* ignore */
      }
    }
    return out
  } catch {
    return {}
  }
}

function write(data: Record<string, string[] | undefined>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new CustomEvent(EVENT))
  } catch {
    /* ignore */
  }
}

function scopeKey(projectSlug: string, pageId: PanePageId) {
  return `${projectSlug}::${String(pageId)}`
}

/**
 * - No entry for the page: “all on” in catalog order (see `usePaneLayout().displayIds` for the full row).
 * - Empty array: user hid all panes.
 * - Non-empty: that order = enabled panes, filtered to catalog, then new catalog ids appended.
 */
export function getVisiblePaneIdsForPage(
  projectSlug: string,
  pageId: PanePageId,
  catalogIds: string[],
): string[] {
  if (catalogIds.length === 0) return []
  const key = scopeKey(projectSlug, pageId)
  const data = read()
  const list = data[key]
  if (list === undefined) return [...catalogIds]
  if (list.length === 0) return []
  const inCatalog = new Set(catalogIds)
  const ordered: string[] = []
  for (const id of list) {
    if (inCatalog.has(id) && !ordered.includes(id)) ordered.push(id)
  }
  for (const id of catalogIds) {
    if (!list.includes(id) && inCatalog.has(id)) ordered.push(id)
  }
  return ordered
}

export function setVisiblePaneOrder(projectSlug: string, pageId: PanePageId, visibleOrderedIds: string[]) {
  const data = { ...read() }
  const key = scopeKey(projectSlug, pageId)
  if (visibleOrderedIds.length > 0) {
    data[key] = [...visibleOrderedIds]
  } else {
    data[key] = []
  }
  write(data)
}

export function showAllPanesOnPage(projectSlug: string, pageId: PanePageId) {
  const data = { ...read() }
  delete data[scopeKey(projectSlug, pageId)]
  write(data)
}

export function subscribePaneLayout(callback: () => void) {
  const handler = () => callback()
  window.addEventListener(EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}
