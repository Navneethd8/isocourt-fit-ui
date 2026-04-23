export type PanelTally = {
  likes: number
  dislikes: number
}

export type PanelComment = {
  id: string
  text: string
  at: string
}

export type PanelFeedbackData = {
  /** Per entity id (e.g. design kit / pane). Running counts. */
  tallies: Record<string, PanelTally>
  comments: Record<string, PanelComment[]>
}

const STORAGE_KEY = 'ui-lab-panel-feedback'
const LEGACY_STORAGE_KEY = 'isocourt-panel-feedback'
const PANEL_FEEDBACK_EVENT = 'ui-lab-panel-feedback-change'

const DEFAULT_NS = 'isocourt'

export function namespacedKey(projectSlug: string, paneId: string) {
  return `${projectSlug}::${paneId}`
}

function empty(): PanelFeedbackData {
  return { tallies: {}, comments: {} }
}

function clampCount(n: number) {
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(Math.floor(n), 99999)
}

function sanitizeTallies(raw: unknown): Record<string, PanelTally> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, PanelTally> = {}
  for (const [entityId, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!v || typeof v !== 'object') continue
    const o = v as Record<string, unknown>
    out[entityId] = {
      likes: clampCount(Number(o.likes)),
      dislikes: clampCount(Number(o.dislikes)),
    }
  }
  return out
}

function sanitizeComments(raw: unknown): Record<string, PanelComment[]> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, PanelComment[]> = {}
  for (const [entityId, list] of Object.entries(raw as Record<string, unknown>)) {
    if (!Array.isArray(list)) continue
    out[entityId] = list
      .filter((c): c is PanelComment => c && typeof c === 'object' && typeof (c as PanelComment).id === 'string')
      .map((c) => ({
        id: (c as PanelComment).id,
        text: String((c as PanelComment).text ?? ''),
        at: String((c as PanelComment).at ?? ''),
      }))
  }
  return out
}

/** Migrate v1 `{ votes, favorite, comments }` → v2 `{ tallies, comments }`. */
function normalize(parsed: unknown): { data: PanelFeedbackData; migrated: boolean } {
  if (!parsed || typeof parsed !== 'object') return { data: empty(), migrated: false }
  const p = parsed as Record<string, unknown>

  if (p.tallies && typeof p.tallies === 'object') {
    return { data: { tallies: sanitizeTallies(p.tallies), comments: sanitizeComments(p.comments) }, migrated: false }
  }

  const comments = sanitizeComments(p.comments)
  const tallies: Record<string, PanelTally> = sanitizeTallies({})

  const votes = p.votes
  if (votes && typeof votes === 'object') {
    for (const [entityId, vote] of Object.entries(votes as Record<string, string>)) {
      const cur = tallies[entityId] ?? { likes: 0, dislikes: 0 }
      if (vote === 'like') tallies[entityId] = { ...cur, likes: cur.likes + 1 }
      else if (vote === 'dislike') tallies[entityId] = { ...cur, dislikes: cur.dislikes + 1 }
    }
  }

  const migrated =
    'votes' in p || 'favorite' in p || ('comments' in p && !('tallies' in p))

  return { data: { tallies, comments }, migrated }
}

function namespaceProjectKeys(data: PanelFeedbackData): { data: PanelFeedbackData; migrated: boolean } {
  let migrated = false
  const tallies: Record<string, PanelTally> = { ...data.tallies }
  const comments: Record<string, PanelComment[]> = { ...data.comments }

  for (const k of Object.keys(tallies)) {
    if (!k.includes('::')) {
      const ns = namespacedKey(DEFAULT_NS, k)
      const old = tallies[k]!
      if (tallies[ns] == null) {
        tallies[ns] = old
      } else {
        const cur = tallies[ns]!
        tallies[ns] = {
          likes: cur.likes + old.likes,
          dislikes: cur.dislikes + old.dislikes,
        }
      }
      delete tallies[k]
      migrated = true
    }
  }
  for (const k of Object.keys(comments)) {
    if (!k.includes('::')) {
      const ns = namespacedKey(DEFAULT_NS, k)
      if (comments[ns] == null) {
        comments[ns] = comments[k]!
      } else {
        comments[ns] = [...(comments[ns] ?? []), ...(comments[k] ?? [])]
      }
      delete comments[k]
      migrated = true
    }
  }
  return { data: { tallies, comments }, migrated }
}

export function loadPanelFeedback(): PanelFeedbackData {
  try {
    let fromLegacy = false
    let raw: string | null
    try {
      raw = localStorage.getItem(STORAGE_KEY)
      if (raw == null) {
        raw = localStorage.getItem(LEGACY_STORAGE_KEY)
        if (raw != null) fromLegacy = true
      }
    } catch {
      return empty()
    }
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as unknown
    const { data: d1, migrated: m1 } = normalize(parsed)
    const { data, migrated: m2 } = namespaceProjectKeys(d1)
    const migrated = m1 || m2
    if (migrated || fromLegacy) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      if (fromLegacy) localStorage.removeItem(LEGACY_STORAGE_KEY)
      window.dispatchEvent(new CustomEvent(PANEL_FEEDBACK_EVENT))
    }
    return data
  } catch {
    return empty()
  }
}

export function savePanelFeedback(data: PanelFeedbackData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new CustomEvent(PANEL_FEEDBACK_EVENT))
}

export function subscribePanelFeedback(callback: () => void) {
  const handler = () => callback()
  window.addEventListener(PANEL_FEEDBACK_EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(PANEL_FEEDBACK_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}
